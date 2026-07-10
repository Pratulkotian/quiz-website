import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// ── SCHOOL INFO ──

export async function getSchoolInfo(schoolCode) {
  const snap = await getDoc(doc(db, 'schools', schoolCode))
  return snap.exists() ? snap.data() : null
}

// ── QUIZZES ──

// Get a single quiz's questions (e.g. quizId = "class8-science")
export async function getQuiz(quizId) {
  const ref = doc(db, 'quizzes', quizId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Quiz not found')
  return { id: snap.id, ...snap.data() }
}

// Get all quizzes (for teacher to pick from when assigning)
export async function getAllQuizzes() {
  const snap = await getDocs(collection(db, 'quizzes'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── ASSIGNMENTS (Teacher assigns a quiz with a time window) ──

export async function createAssignment({ quizId, schoolCode, groupCode, teacherUid, startTime, endTime, passcode, targetClassLevel, targetSubject }) {
  const ref = await addDoc(collection(db, 'assignments'), {
    quizId,
    schoolCode,
    groupCode,
    assignedBy: teacherUid,
    startTime: Timestamp.fromDate(new Date(startTime)),
    endTime: Timestamp.fromDate(new Date(endTime)),
    passcode,
    targetClassLevel,
    targetSubject,
    createdAt: Timestamp.now()
  })
  return ref.id
}

// Get all assignments for a school (used by both teacher view + student view)
export async function getAssignmentsForSchool(schoolCode) {
  const q = query(collection(db, 'assignments'), where('schoolCode', '==', schoolCode))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getAssignmentsForGroup(groupCode) {
  const q = query(collection(db, 'assignments'), where('groupCode', '==', groupCode))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Helper: figure out if an assignment is currently open, upcoming, or closed
export function getAssignmentStatus(assignment) {
  const now = new Date()
  const start = assignment.startTime.toDate()
  const end = assignment.endTime.toDate()

  if (now < start) return 'upcoming'
  if (now > end) return 'closed'
  return 'open'
}

// ── ATTEMPTS (Student quiz submissions) ──

export async function submitAttempt({
  studentUid,
  studentName,
  assignmentId,
  quizId,
  schoolCode,
  score,
  totalQuestions,
  answers
}) {
  const accuracy = Math.round((score / totalQuestions) * 100)

  const ref = await addDoc(collection(db, 'attempts'), {
    studentUid,
    studentName,
    assignmentId,
    quizId,
    schoolCode,
    score,
    totalQuestions,
    accuracy,
    answers, // [{ question, selected, correct, isCorrect, explanation }]
    submittedAt: Timestamp.now()
  })
  return ref.id
}

// Get all attempts by one student (for their "My Submissions" dashboard)
export async function getStudentAttempts(studentUid) {
  const q = query(
    collection(db, 'attempts'),
    where('studentUid', '==', studentUid),
    orderBy('submittedAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Get all attempts for a school (for teacher analytics dashboard)
export async function getSchoolAttempts(schoolCode) {
  const q = query(
    collection(db, 'attempts'),
    where('schoolCode', '==', schoolCode),
    orderBy('submittedAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Get leaderboard — top scores for a school, optionally filtered by quiz
export async function getLeaderboard(schoolCode, quizId = null) {
  let q
  if (quizId) {
    q = query(
      collection(db, 'attempts'),
      where('schoolCode', '==', schoolCode),
      where('quizId', '==', quizId),
      orderBy('score', 'desc'),
      limit(20)
    )
  } else {
    q = query(
      collection(db, 'attempts'),
      where('schoolCode', '==', schoolCode),
      orderBy('score', 'desc'),
      limit(20)
    )
  }
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── SCHOOL DASHBOARD (approve/reject class requests) ──

export async function getPendingClassRequests(schoolCode) {
  const q = query(
    collection(db, 'classRequests'),
    where('schoolCode', '==', schoolCode),
    where('status', '==', 'pending')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getApprovedClasses(schoolCode) {
  const q = query(collection(db, 'groups'), where('schoolCode', '==', schoolCode))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function approveClassRequest(request) {
  // Create the real group document
  await setDoc(doc(db, 'groups', request.proposedGroupCode), {
    schoolCode: request.schoolCode,
    groupName: request.proposedGroupName,
    createdBy: request.requestedBy,
    approvedAt: new Date().toISOString()
  })

  // Give the teacher their groupCode
  await updateDoc(doc(db, 'users', request.requestedBy), {
    groupCode: request.proposedGroupCode
  })

  // Mark the request as approved
  await updateDoc(doc(db, 'classRequests', request.id), {
    status: 'approved'
  })
}

export async function rejectClassRequest(requestId) {
  await updateDoc(doc(db, 'classRequests', requestId), {
    status: 'rejected'
  })
}

// Get all teachers at a school, with their group info + student count
export async function getTeachersForSchool(schoolCode) {
  const teachersQ = query(collection(db, 'users'), where('schoolCode', '==', schoolCode), where('role', '==', 'teacher'))
  const teachersSnap = await getDocs(teachersQ)
  const teachers = teachersSnap.docs.map(d => ({ id: d.id, ...d.data() }))

  const groupsQ = query(collection(db, 'groups'), where('schoolCode', '==', schoolCode))
  const groupsSnap = await getDocs(groupsQ)
  const groups = groupsSnap.docs.map(d => ({ id: d.id, ...d.data() }))

  const studentsQ = query(collection(db, 'users'), where('schoolCode', '==', schoolCode), where('role', '==', 'student'))
  const studentsSnap = await getDocs(studentsQ)
  const students = studentsSnap.docs.map(d => d.data())

  return teachers.map(teacher => {
    const group = groups.find(g => g.createdBy === teacher.id)
    const studentCount = group ? students.filter(s => s.groupCode === group.id).length : 0
    return {
      ...teacher,
      groupCode: group?.id || null,
      groupName: group?.groupName || null,
      studentCount
    }
  })
}

// ── STUDENT INFO DASHBOARD (Teacher) ──

export async function getStudentsInGroup(groupCode) {
  const q = query(collection(db, 'users'), where('groupCode', '==', groupCode), where('role', '==', 'student'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function updateStudentClassLevel(studentUid, newClassLevel) {
  await updateDoc(doc(db, 'users', studentUid), { classLevel: newClassLevel })
}
