import { useState, useEffect } from 'react'
import { getVideosForStudent, markVideoCompleted, getStudentVideoProgress } from './videoService'

function getYoutubeEmbedUrl(url) {
  try {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${id}`
    }
  } catch {}
  return null
}

function isYoutubeUrl(url) {
  return url?.includes('youtube.com') || url?.includes('youtu.be')
}

function isGoogleDriveUrl(url) {
  return url?.includes('drive.google.com')
}
function isStreamableUrl(url) {
  return url?.includes('streamable.com')
}

function getStreamableEmbedUrl(url) {
  try {
    const match = url.match(/streamable\.com\/([a-zA-Z0-9]+)/)
    if (match && match[1]) {
      return `https://streamable.com/e/${match[1]}`
    }
  } catch {}
  return url
}
function isVimeoUrl(url) {
  return url?.includes('vimeo.com')
}

function getVimeoEmbedUrl(url) {
  try {
    const match = url.match(/vimeo\.com\/(\d+)/)
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`
    }
  } catch {}
  return url
}
function getGoogleDriveDirectUrl(url) {
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
  } catch {}
  return url
}

export default function VideoStudentView({ user, onBack }) {
  const [videos, setVideos] = useState([])
  const [completedIds, setCompletedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [vids, prog] = await Promise.all([
        getVideosForStudent(user.groupCode, user.classLevel),
        getStudentVideoProgress(user.uid)
      ])
      setVideos(vids)
      setCompletedIds(new Set(prog.map(p => p.videoId)))
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function handleVideoEnded(video) {
    if (completedIds.has(video.id)) return
    try {
      await markVideoCompleted({ videoId: video.id, studentUid: user.uid, studentName: user.name })
      setCompletedIds(prev => new Set([...prev, video.id]))
    } catch (e) { console.error(e) }
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 py-9">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#1a1text-gray-600 dark:text-gray-400a2e] dark:text-white transition hover:border-indigo-500 hover:text-indigo-500"
      >
        ← Back to Home
      </button>

      <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white dark:text-white">🎬 My Videos</h2>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Videos for {user.classLevel} — {completedIds.size}/{videos.length} completed
      </p>

      {/* Active Video Player */}
      {activeVideo && (
        <div className="mb-8 rounded-3xl border border-indigo-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 shadow-lg dark:border-indigo-900 dark:bg-gray-900">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-[#1a1a2e] dark:text-white dark:text-white">{activeVideo.title}</h3>
            <button
              onClick={() => setActiveVideo(null)}
              className="text-sm text-gray-400 hover:text-[#1a1text-gray-600 dark:text-gray-400a2e] dark:text-white"
            >
              ✕ Close
            </button>
          </div>

          {isYoutubeUrl(activeVideo.videoUrl) ? (
            <div className="rounded-xl bg-gray-50 p-10 text-center dark:bg-gray-800">
              <div className="mb-4 text-4xl">▶️</div>
              <p className="mb-4 text-sm text-[#1a1text-gray-600 dark:text-gray-400a2e] dark:text-white dark:text-gray-300">
                This video opens on YouTube for the best playback experience.
              </p>
              
             <a   href={activeVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Watch on YouTube ↗
              </a>
            </div>
            ) : isStreamableUrl(activeVideo.videoUrl) ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full rounded-xl"
                src={getStreamableEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            ) : isVimeoUrl(activeVideo.videoUrl) ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full rounded-xl"
                src={getVimeoEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : isGoogleDriveUrl(activeVideo.videoUrl) ? (
            <div className="rounded-xl bg-gray-50 p-10 text-center dark:bg-gray-800">
              <div className="mb-4 text-4xl">🎬</div>
              <p className="mb-4 text-sm text-[#1a1text-gray-600 dark:text-gray-400a2e] dark:text-white dark:text-gray-300">
                This video is hosted on Google Drive and opens in a new tab for the best playback experience.
              </p>
              <a href={activeVideo.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg">
                Watch on Google Drive ↗
              </a>
            </div>
          ) : (
            <video
              className="w-full rounded-xl"
              src={activeVideo.videoUrl}
              controls
              onEnded={() => handleVideoEnded(activeVideo)}
            />
          )}

          {(isYoutubeUrl(activeVideo.videoUrl) || isGoogleDriveUrl(activeVideo.videoUrl) || isStreamableUrl(activeVideo.videoUrl) || isVimeoUrl(activeVideo.videoUrl)) && !completedIds.has(activeVideo.id) && (
            <button
              onClick={() => handleVideoEnded(activeVideo)}
              className="mt-3 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              ✅ Mark as Completed
            </button>
          )}

          {completedIds.has(activeVideo.id) && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950">
              <p className="text-sm font-semibold text-green-600">✅ You've completed this video!</p>
              <button
                onClick={() => { setActiveVideo(null); setTimeout(() => setActiveVideo(activeVideo), 50) }}
                className="text-xs font-semibold text-green-700 underline hover:text-green-900"
              >
                Watch Again
              </button>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
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
          <p className="text-gray-500 dark:text-gray-400">No videos available for your class yet. Check back later!</p>
        </div>
      )}

      <div className="space-y-3">
        {videos.map(v => {
          const done = completedIds.has(v.id)
          const isActive = activeVideo?.id === v.id
          return (
            <button
              key={v.id}
              onClick={() => setActiveVideo(isActive ? null : v)}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition hover:border-indigo-500 ${isActive ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950' : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${done ? 'bg-green-100 dark:bg-green-950' : 'bg-indigo-100 dark:bg-indigo-950'}`}>
                  {done ? '✅' : '▶️'}
                </div>
                <div>
                  <p className="font-bold text-[#1a1a2e] dark:text-white dark:text-white">{v.title}</p>
                  <div className="mt-0.5 flex gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{v.subject}</span>
                    {done && <span className="text-xs font-semibold text-green-600">Completed</span>}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-500">{isActive ? 'Close ▲' : 'Watch ▶'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
