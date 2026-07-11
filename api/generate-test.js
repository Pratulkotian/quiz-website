export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { noteText, className, subject, numQuestions } = req.body

  if (!noteText || !className || !subject) {
    return res.status(400).json({ error: 'Missing required fields: noteText, className, subject' })
  }

  const count = numQuestions || 5

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
${noteText}`

  try {
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

    // Clean up in case the model wraps the JSON in markdown fences despite instructions
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