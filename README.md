# Prastuti 🧠

A full-featured quiz platform for Class 8, 9, and 10 students, built for Science and Mathematics — with role-based approval chains for Schools, Teachers, and Students, AI-powered test generation, and complete content delivery through notes and video lessons.

**🔗 Live Demo:** [quiz-website-eta-red.vercel.app](https://quiz-website-eta-red.vercel.app)

---

## What It Does

Prastuti models a real school's structure digitally:

- A **School** registers and gets approved by an admin
- **Teachers** join an approved school and get their own group code to manage students
- **Students** join a teacher's group, self-select their class level, and attempt assigned quizzes
- Every quiz is time-windowed and passcode-protected, so students can only attempt it when the teacher intends

On top of the core quiz engine, the platform includes AI-assisted test creation, video lessons, and downloadable study notes — turning it into a small but complete classroom management tool, not just a quiz app.

## Core Features

**Authentication & Roles**
- Email/password auth with three roles: School, Teacher, Student
- School registration requires manual admin approval before going live
- Teachers request a class group (auto-named, uniquely coded) which the school approves
- Students self-declare their class level and join via a teacher's group code
- Sessions persist across page refreshes

**Quiz Engine**
- 420+ hand-curated questions across Class 8/9/10 Science and Mathematics
- Each quiz attempt pulls 10 random questions with shuffled answer options, so no two students see an identical test
- Per-question timer, submit-to-lock answering (not click-to-advance)
- Assignments are scoped to a specific class level and subject, with a start/end time window and a teacher-set passcode
- Full review screen after submission — correct/incorrect breakdown with explanations for every question

**AI Test Generation**
- Teachers upload study notes as PDFs
- A serverless function extracts the PDF's text and sends it to Google's Gemini API, which drafts a set of multiple-choice questions
- Teachers review, edit, or delete each generated question before publishing — nothing goes live without human approval
- Published AI tests become their own standalone quiz that can be assigned like any other

**Dashboards**
- **Teacher:** assign quizzes, view ranked student analytics, search any student's full profile (quiz scores, notes downloaded, videos completed), correct a student's self-reported class if needed
- **School:** approve or reject teacher group requests (with an optional reason), view all teachers and their student counts, see a school-wide leaderboard across every class
- **Student:** assignment dashboard filtered to their exact class and group, video lessons and notes filtered the same way, a personal results history with teacher feedback, and a leaderboard

**Other**
- Dark mode
- Copy-to-clipboard for every code a user needs to share (school code, group code, quiz passcode, invite message)
- Loading skeletons instead of bare "Loading..." text

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Firebase — Firestore (database) and Authentication, accessed directly from the client with no traditional server
- **AI:** Google Gemini API, called through a Vercel serverless function so the API key never reaches the browser
- **Hosting:** Vercel, auto-deployed from this repository

## Data Model

Firestore is structured around the approval hierarchy:

```
schoolRequests → schools
classRequests  → groups
users (role: school | teacher | student, tagged with schoolCode / groupCode / classLevel)
quizzes → assignments → attempts
notes → noteDownloads
videos → videoProgress
```

Security rules enforce that only authenticated users can read most collections, and that sensitive writes (like approving a school or a class request) can't be spoofed from outside the app.

## Running Locally

```bash
git clone https://github.com/Pratulkotian/quiz-website.git
cd quiz-website
npm install
npm run dev
```

You'll need your own Firebase project (Firestore + Authentication enabled) and a Gemini API key to run the full feature set — add them to `src/firebase.js` and as a `GEMINI_API_KEY` environment variable respectively.

---

*Built as part of an internship project exploring full-stack development with Firebase and AI integration.*
