import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { doc, setDoc, getDoc, getDocs, collection, addDoc, query, where, updateDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

// SIGN UP — creates auth account + user profile document
// CREATE SCHOOL — used when a teacher signs up and creates a new school code
export async function createSchool({ schoolCode, schoolName }) {
  const code = schoolCode.trim().toUpperCase()
  const schoolRef = doc(db, 'schools', code)
  const existing = await getDoc(schoolRef)

  if (existing.exists()) {
    throw new Error('This school code is already taken. Please choose a different one.')
  }

  await setDoc(schoolRef, {
    name: schoolName,
    createdAt: new Date().toISOString()
  })

  return code
}
export async function signUp({ name, email, password, role, schoolCode, isNewSchool, schoolName, groupCode, classLevel }) {
  let finalSchoolCode = schoolCode?.trim().toUpperCase() || ''
  let finalGroupCode = null
  let finalClassLevel = null

  if (role === 'student') {
    // Verify the group code BEFORE creating the auth account
    const code = groupCode.trim().toUpperCase()
    const groupSnap = await getDoc(doc(db, 'groups', code))
    if (!groupSnap.exists()) {
      throw new Error('Invalid group code. Please check with your teacher.')
    }
    finalGroupCode = code
    finalSchoolCode = groupSnap.data().schoolCode
    finalClassLevel = classLevel
  }

  // Create the auth account
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  if (role === 'teacher') {
    if (isNewSchool) {
      // Teacher is creating a brand new school code
      finalSchoolCode = await createSchool({ schoolCode: finalSchoolCode, schoolName })
    } else {
      // Teacher joining an existing school — verify the code exists
      const schoolRef = doc(db, 'schools', finalSchoolCode)
      const schoolSnap = await getDoc(schoolRef)
      if (!schoolSnap.exists()) {
        throw new Error('Invalid school code. Please check with your teacher/admin.')
      }
    }
  }

  // Save extra profile info in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    role,
    schoolCode: finalSchoolCode,
    groupCode: finalGroupCode,
    classLevel: finalClassLevel,
    createdAt: new Date().toISOString()
  })

  return user
}

// SIGN IN
export async function signIn({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Fetch their profile info (name, role, schoolCode)
  const userDoc = await getDoc(doc(db, 'users', user.uid))
  if (!userDoc.exists()) {
    throw new Error('User profile not found.')
  }

  return { uid: user.uid, ...userDoc.data() }
}

// SIGN OUT
// SCHOOL SIGNUP — creates auth account + a pending request (not a real school yet)
export async function requestSchool({ schoolName, contactName, contactPhone, address, email, password, proposedSchoolCode, udiseCode }) {
  const code = proposedSchoolCode.trim().toUpperCase()
  const udise = udiseCode.trim()

  // Verify the UDISE code exists and hasn't been used yet
  const udiseSnap = await getDoc(doc(db, 'validUdiseCodes', udise))
  if (!udiseSnap.exists()) {
    throw new Error('Invalid UDISE code. Please check with your school administration.')
  }
  if (udiseSnap.data().used) {
    throw new Error('This UDISE code has already been used to register a school.')
  }

  // Block duplicate school names (case-insensitive)
  const schoolsSnap = await getDocs(collection(db, 'schools'))
  const nameTaken = schoolsSnap.docs.some(
    d => d.data().name.trim().toLowerCase() === schoolName.trim().toLowerCase()
  )
  if (nameTaken) {
    throw new Error('A school with this name is already registered.')
  }

  // Block duplicate proposed codes too
  const codeSnap = await getDoc(doc(db, 'schools', code))
  if (codeSnap.exists()) {
    throw new Error('This school code is already taken. Please choose a different one.')
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Create the school immediately — no admin approval needed
  await setDoc(doc(db, 'schools', code), {
    name: schoolName,
    address,
    contactPhone,
    schoolUid: user.uid,
    udiseCode: udise,
    approvedAt: new Date().toISOString()
  })

  // Mark the UDISE code as used
  await updateDoc(doc(db, 'validUdiseCodes', udise), {
    used: true,
    usedBySchoolCode: code
  })

  await setDoc(doc(db, 'users', user.uid), {
    name: contactName,
    email,
    role: 'school',
    schoolCode: code,
    createdAt: new Date().toISOString()
  })

  return user
}

// Check if a school's request has been approved yet
export async function getSchoolStatus(schoolCode) {
  const schoolDoc = await getDoc(doc(db, 'schools', schoolCode))
  return schoolDoc.exists() ? 'approved' : 'pending'
}
// Generate the auto group name from teacher name + school name
export function generateGroupName(teacherName, schoolName) {
  const parts = teacherName.trim().split(' ')
  const firstName = parts[0] || ''
  const restOfName = parts.slice(1).join(' ') || firstName // fallback if no last name given

  const firstPart = firstName.slice(0, 3).toUpperCase()
  const lastPart = restOfName.slice(0, 3).toUpperCase()
  const schoolPart = schoolName.trim().slice(0, 3).toUpperCase()

  return `${firstPart}${lastPart}${schoolPart}`
}

// Check if a group name is already taken at this school (among approved groups)
export async function isGroupNameTaken(schoolCode, groupName) {
  const q = query(collection(db, 'groups'), where('schoolCode', '==', schoolCode))
  const snap = await getDocs(q)
  return snap.docs.some(d => d.data().groupName === groupName)
}

// TEACHER REQUESTS A GROUP — creates a pending request, needs School approval
export async function requestGroup({ teacherUid, teacherName, schoolCode, schoolName, proposedGroupCode, nameOverride }) {
  const code = proposedGroupCode.trim().toUpperCase()

  // Block duplicate group codes
  const existingCode = await getDoc(doc(db, 'groups', code))
  if (existingCode.exists()) {
    throw new Error('This group code is already taken. Please choose a different one.')
  }

  const baseName = generateGroupName(teacherName, schoolName)
  const groupName = nameOverride ? nameOverride.trim().toUpperCase() : baseName

  const nameTaken = await isGroupNameTaken(schoolCode, groupName)
  if (nameTaken) {
    throw new Error(`The name "${groupName}" is already taken at your school. Try appending a number, e.g. "${groupName}2".`)
  }

  await addDoc(collection(db, 'classRequests'), {
    schoolCode,
    requestedBy: teacherUid,
    requestedByName: teacherName,
    proposedGroupName: groupName,
    proposedGroupCode: code,
    status: 'pending',
    createdAt: new Date().toISOString()
  })
}

// Check if THIS teacher has a group yet, and what status their latest request is
export async function getTeacherGroupStatus(teacherUid) {
  const q = query(collection(db, 'classRequests'), where('requestedBy', '==', teacherUid))
  const snap = await getDocs(q)
  if (snap.empty) return { status: 'none' }

  const requests = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return requests[0]
}
export async function signOutUser() {
  await firebaseSignOut(auth)
}