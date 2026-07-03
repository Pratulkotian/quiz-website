import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
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
export async function signUp({ name, email, password, role, schoolCode, isNewSchool, schoolName }) {
  let finalSchoolCode = schoolCode.trim().toUpperCase()

  // Create the auth account FIRST so request.auth is populated for subsequent writes
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  if (isNewSchool) {
    // Teacher is creating a brand new school code
    finalSchoolCode = await createSchool({ schoolCode: finalSchoolCode, schoolName })
  } else {
    // Student (or teacher joining existing school) — verify the code exists
    const schoolRef = doc(db, 'schools', finalSchoolCode)
    const schoolSnap = await getDoc(schoolRef)
    if (!schoolSnap.exists()) {
      throw new Error('Invalid school code. Please check with your teacher/admin.')
    }
  }

  // Save extra profile info in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    role,
    schoolCode: finalSchoolCode,
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
export async function signOutUser() {
  await firebaseSignOut(auth)
}