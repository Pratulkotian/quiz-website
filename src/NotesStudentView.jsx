import { useEffect, useState } from "react";
import { getNotesForStudent, logDownload } from "./notesService";

export default function NotesStudentView({ user, setPage }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const data = await getNotesForStudent(
        user.groupCode,
        user.classLevel
      );
      console.log("Student notes:", data);
      console.log("Student group:", user.groupCode);
      console.log("Student class:", user.classLevel);
      setNotes(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(note) {
    try {
      await logDownload({
        noteId: note.id,
        studentUid: user.uid,
        studentName: user.name,
      });

      window.open(note.fileUrl, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to download note.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
        <button
            onClick={() => setPage("home")}
            className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
        >
            ← Back to Dashboard
        </button>

      <h2 className="mb-2 text-3xl font-extrabold text-[#1a1a2e] dark:text-white">
        Study Notes
      </h2>

      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Notes uploaded by your teacher for your class.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notes.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No notes available.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">

          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white">
                    {note.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Subject: {note.subject}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Class: {note.targetClassLevel}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(note)}
                  className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Download PDF
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}