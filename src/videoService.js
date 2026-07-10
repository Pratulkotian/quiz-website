import { collection, addDoc, getDocs, query, where, Timestamp, getDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

export async function uploadVideo({ groupCode, targetClassLevel, subject, title, videoUrl, uploadedBy }) {
  await addDoc(collection(db, 'videos'), {
    groupCode, targetClassLevel, subject, title, videoUrl, uploadedBy, uploadedAt: Timestamp.now()
  })
}

export async function getVideosForTeacher(groupCode) {
  const q = query(collection(db, 'videos'), where('groupCode', '==', groupCode))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getVideosForStudent(groupCode, classLevel) {
  const q = query(
    collection(db, 'videos'),
    where('groupCode', '==', groupCode),
    where('targetClassLevel', '==', classLevel)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function markVideoCompleted({ videoId, studentUid, studentName }) {
  // Avoid duplicate completions
  const q = query(
    collection(db, 'videoProgress'),
    where('videoId', '==', videoId),
    where('studentUid', '==', studentUid)
  )
  const existing = await getDocs(q)
  if (!existing.empty) return
  await addDoc(collection(db, 'videoProgress'), {
    videoId, studentUid, studentName, completed: true, completedAt: Timestamp.now()
  })
}

export async function getVideoProgress(groupCode) {
  // Get all progress for videos in this group
  const videos = await getVideosForTeacher(groupCode)
  const videoIds = videos.map(v => v.id)
  if (videoIds.length === 0) return []
  const snap = await getDocs(collection(db, 'videoProgress'))
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(p => videoIds.includes(p.videoId))
}

export async function getStudentVideoProgress(studentUid) {
  const q = query(collection(db, 'videoProgress'), where('studentUid', '==', studentUid))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
