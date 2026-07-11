import pdf from 'pdf-parse'

function getGoogleDriveDirectUrl(url) {
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
  } catch {}
  return url
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { driveUrl, className, subject, numQuestions } = req.body

  if (!driveUrl || !className || !subject) {
    return res.status(400).json({ error: 'Missing required fields: driveUrl, className, subject' })
  }

  const count = numQuestions || 5

  try {
    // Step 1: Fetch the PDF from Google Drive
    const directUrl = getGoogleDriveDirectUrl(driveUrl)
    const pdfResponse = await fetch(directUrl)

    if (!pdfResponse.ok) {
      return res.status(502).json({ error: 'Could not fetch the PDF from Google Drive. Make sure the link sharing is set to "Anyone with the link".' })
    }

    const contentType = pdfResponse.headers.get('content-type') || ''
    if (!contentType.includes('pdf') && !contentType.includes('octet-stream')) {
      return res.status(502).json({ error: 'The Drive link did not return a PDF file. It may require sign-in or the file is not a PDF.' })
    }

    const arrayBuffer = await pdfResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Step 2: Extract text from the PDF
    const pdfData = await pdf(buffer)
    const noteText = pdfData.text.trim()

    if (!noteText || noteText.length < 50) {
      return res.status(502).json({ error: 'Could not extract readable text from this PDF. It may be a scanned image rather than text.' })
    }

    // Step 3: Build the prompt and call Gemini
    const prompt = `You are creating a multiple-choice quiz for ${className} ${subject} students, based on the following study notes.

Generate exactly ${count} multiple-choice questions based ONLY on the content below. Each question must have exactly 4 options, one correct answer, and a short one-sentence explanation of why that answer is correct.

Respond with ONLY a valid JSON array, no other text, no markdown code fences. Format:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "... (must exactly match one of the options)",
    "explanation": "..."
  }
]

STUDY NOTES:
${noteText.slice(0, 15000)}`

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text()
      return res.status(502).json({ error: 'AI service error', details: errText })
    }

    const data = await geminiResponse.json()
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim()

    let questions
    try {
      questions = JSON.parse(cleaned)
    } catch (parseErr) {
      return res.status(502).json({ error: 'Could not parse AI response as JSON', raw: rawText })
    }

    return res.status(200).json({ questions })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message })
  }
}
