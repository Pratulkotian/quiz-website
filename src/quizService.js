import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

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

export async function createAssignment({ quizId, schoolCode, teacherUid, startTime, endTime }) {
  const ref = await addDoc(collection(db, 'assignments'), {
    quizId,
    schoolCode,
    assignedBy: teacherUid,
    startTime: Timestamp.fromDate(new Date(startTime)),
    endTime: Timestamp.fromDate(new Date(endTime)),
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
