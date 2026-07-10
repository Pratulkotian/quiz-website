import { useEffect, useState } from "react";
import { uploadNote, getTeacherNotes,updateNote,deleteNote} from "./notesService";

export default function NotesTeacherView({ user, setPage }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Science");
  const [targetClassLevel, setTargetClassLevel] = useState("Class 8");
  const [fileUrl, setFileUrl] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const data = await getTeacherNotes(user.groupCode);
      console.log("Teacher notes:", data);
      console.log("Teacher groupCode:", user.groupCode);
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!fileUrl.trim()) {
      alert("Please paste the Google Drive link.");
      return;
    }

    setLoading(true);

    try {
      await uploadNote({
        fileUrl,
        groupCode: user.groupCode,
        targetClassLevel,
        subject,
        title,
        uploadedBy: user.uid,
      });

      alert("Note uploaded successfully!");

      setTitle("");
      setSubject("Science");
      setTargetClassLevel("Class 8");
      setFileUrl("");

      loadNotes();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  async function handleDelete(noteId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  try {
    await deleteNote(noteId);

    alert("Note deleted successfully.");

    loadNotes();
  } catch (err) {
    alert(err.message);
  }
}

async function handleEdit(note) {
  const newTitle = prompt("Edit title", note.title);

  if (!newTitle) return;

  try {
    await updateNote(note.id, {
      title: newTitle,
    });

    alert("Note updated successfully.");

    loadNotes();
  } catch (err) {
    alert(err.message);
  }
}

return (
  <div className="mx-auto max-w-5xl p-6">
      <button
        onClick={() => setPage("home")}
        className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
      >
        ← Back to Dashboard
      </button>

      <h1 className="mb-2 text-3xl font-extrabold text-[#1a1a2e]">
        📄 Notes
      </h1>

      <p className="mb-8 text-gray-500">
        Upload notes for students in your group.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">

        <form
          onSubmit={handleUpload}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block font-semibold">
              Note Title
            </label>

            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block font-semibold">
                Class Level
              </label>

              <select
                value={targetClassLevel}
                onChange={(e) =>
                  setTargetClassLevel(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Subject
              </label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option>Science</option>
                <option>Mathematics</option>
              </select>
            </div>

          </div>

          <div>
            <label className="mb-2 block font-semibold">
              PDF File
            </label>

            <input
              type="text"
              placeholder="Paste Google Drive share link"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Note"}
          </button>

        </form>

      </div>

      <div className="mt-10">

        <h2 className="mb-5 text-2xl font-bold">
          Uploaded Notes
        </h2>

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No notes uploaded yet.
          </div>
        ) : (
          <div className="space-y-4">

            {notes.map((note) => (

  <div
    key={note.id}
    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
  >

    <h3 className="text-lg font-bold">
      {note.title}
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      {note.subject} • {note.targetClassLevel}
    </p>

    <a
      href={note.fileUrl}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-block font-semibold text-indigo-600 hover:underline"
    >
      View PDF
    </a>

    <div className="mt-4 flex gap-3">

      <button
        onClick={() => handleEdit(note)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
      >
        ✏ Edit
      </button>

      <button
        onClick={() => handleDelete(note.id)}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
      >
        🗑 Delete
      </button>

    </div>

  </div>

))}

          </div>
        )}

      </div>

    </div>
  );
}