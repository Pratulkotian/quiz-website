import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Upload a note
export async function uploadNote({
  fileUrl,
  groupCode,
  targetClassLevel,
  subject,
  title,
  uploadedBy,
}) {
  console.log("Uploading note:", {
  groupCode,
  targetClassLevel,
  subject,
  title,
  fileUrl,
  uploadedBy,
});

  await addDoc(collection(db, "notes"), {
    groupCode,
    targetClassLevel,
    subject,
    title,
    fileUrl,
    uploadedBy,
    uploadedAt: Timestamp.now(),
  });
}

// Get all notes uploaded by a teacher's group
export async function getTeacherNotes(groupCode) {
  const q = query(
    collection(db, "notes"),
    where("groupCode", "==", groupCode)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get notes for students
export async function getNotesForStudent(groupCode, classLevel) {
  const q = query(
    collection(db, "notes"),
    where("groupCode", "==", groupCode),
    where("targetClassLevel", "==", classLevel)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Log downloads
export async function logDownload({
  noteId,
  studentUid,
  studentName,
}) {
  await addDoc(collection(db, "noteDownloads"), {
    noteId,
    studentUid,
    studentName,
    downloadedAt: Timestamp.now(),
  });
}

export async function updateNote(noteId, updatedData) {
  const noteRef = doc(db, "notes", noteId);

  await updateDoc(noteRef, updatedData);
}

export async function deleteNote(noteId) {
  const noteRef = doc(db, "notes", noteId);

  await deleteDoc(noteRef);
}