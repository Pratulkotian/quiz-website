import { useState, useEffect } from 'react'
import { uploadVideo, getVideosForTeacher, getVideoProgress, deleteVideo } from './videoService'

const CLASS_LEVELS = ['Class 8', 'Class 9', 'Class 10']
const SUBJECTS = ['Mathematics', 'Science']

export default function VideoTeacherView({ user, onBack }) {
  const [videos, setVideos] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', targetClassLevel: '', subject: '', videoUrl: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [vids, prog] = await Promise.all([
        getVideosForTeacher(user.groupCode),
        getVideoProgress(user.groupCode)
      ])
      setVideos(vids)
      setProgress(prog)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const finalUrl = form.videoUrl.trim()
      if (!finalUrl) { setError('Please paste a video link.'); setSubmitting(false); return }

      await uploadVideo({
        groupCode: user.groupCode,
        targetClassLevel: form.targetClassLevel,
        subject: form.subject,
        title: form.title.trim(),
        videoUrl: finalUrl,
        uploadedBy: user.uid
      })
      setSuccess('Video added successfully!')
      setForm({ title: '', targetClassLevel: '', subject: '', videoUrl: '' })
      loadData()
    } catch (e) {
      setError(e.message)
    }
    setSubmitting(false)
  }

  function getCompletionCount(videoId) {
    return progress.filter(p => p.videoId === videoId).length
  }
async function handleDelete(videoId) {
    if (!confirm('Delete this video? This cannot be undone.')) return
    try {
      await deleteVideo(videoId)
      loadData()
    } catch (e) {
      alert('Error deleting video: ' + e.message)
    }
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 py-9">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
      >
        ← Back to Dashboard
      </button>

      <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">🎬 Video Management</h2>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Add a video link for your students, filtered by class and subject</p>

      <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-bold text-[#1a1a2e] dark:text-white">Add New Video</h3>
        {success && <p className="mb-4 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">{success}</p>}
        {error && <p className="mb-4 text-sm font-medium text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Video Title</label>
            <input
              className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g. Introduction to Photosynthesis"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Class Level</label>
              <select
                className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={form.targetClassLevel}
                onChange={e => setForm({ ...form, targetClassLevel: e.target.value })}
                required
              >
                <option value="">Select class...</option>
                {CLASS_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Subject</label>
              <select
                className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                required
              >
                <option value="">Select subject...</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Video Link</label>
            <input
              className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Paste a YouTube or Google Drive link"
              value={form.videoUrl}
              onChange={e => setForm({ ...form, videoUrl: e.target.value })}
              required
            />
            <div className="mt-2 space-y-1.5 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
              <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">📌 How to get a link:</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>YouTube:</strong> Upload as "Unlisted", copy the link, paste here.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Own video (from your device):</strong> Upload to Google Drive → right-click → Share → "Anyone with the link" → copy link, paste here.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? 'Adding...' : 'Add Video →'}
          </button>
        </form>
      </div>

      <h3 className="mb-4 text-lg font-bold text-[#1a1a2e] dark:text-white">Your Videos ({videos.length})</h3>

      {loading && (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-3 text-4xl">🎬</div>
          <p className="text-gray-500 dark:text-gray-400">No videos uploaded yet. Add your first video above!</p>
        </div>
      )}

      <div className="space-y-3">
        {videos.map(v => {
          const completions = getCompletionCount(v.id)
          const isYoutube = v.videoUrl?.includes('youtube.com') || v.videoUrl?.includes('youtu.be')
          return (
            <div key={v.id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{isYoutube ? '▶️' : '🎬'}</span>
                    <p className="font-bold text-[#1a1a2e] dark:text-white">{v.title}</p>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">{v.targetClassLevel}</span>
                    <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:bg-purple-950 dark:text-purple-400">{v.subject}</span>
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">✅ {completions} completed</span>
                  </div>
                  <p className="mt-1.5 truncate text-xs text-gray-400">{v.videoUrl}</p>
                </div>
                
                  <div className="flex shrink-0 gap-2">
                  <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100">
                    Preview ↗
                  </a>
                  <button onClick={() => handleDelete(v.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
