import { useState, useEffect } from 'react'
import { signUp, signIn, signOutUser, requestSchool, getSchoolStatus } from './authService'
import { getQuiz, submitAttempt, getAllQuizzes, createAssignment, getSchoolAttempts, getLeaderboard, getAssignmentsForSchool, getAssignmentsForClass, getAssignmentStatus, getStudentAttempts, getSchoolInfo } from './quizService'
import { requestGroup, getTeacherGroupStatus, generateGroupName } from './authService'
import { getPendingClassRequests, getApprovedClasses, approveClassRequest, rejectClassRequest } from './quizService'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db, auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
const questionBank = {
  'class8-science': [
    { question: "Which type of fabric absorbs less water and dries faster?", options: ["Cotton", "Wool", "Synthetic", "Silk"], answer: "Synthetic" },
    { question: "Why are synthetic fibers preferred for raincoats?", options: ["They are cheaper", "They absorb less water", "They are heavier", "They are natural"], answer: "They absorb less water" },
    { question: "What is formed when magnesium burns in air?", options: ["Magnesium chloride", "Magnesium oxide", "Magnesium sulfate", "Magnesium nitrate"], answer: "Magnesium oxide" },
    { question: "What color flame does magnesium burn with?", options: ["Red", "Blue", "Bright white", "Yellow"], answer: "Bright white" },
    { question: "What are the unburnt carbon particles in a flame called?", options: ["Ash", "Soot", "Smoke", "Dust"], answer: "Soot" },
    { question: "Which zone of a flame contains unburnt carbon particles?", options: ["Dark zone", "Outer zone", "Luminous zone", "Inner zone"], answer: "Luminous zone" },
    { question: "How does heat travel along a metal wire?", options: ["Radiation", "Convection", "Conduction", "Reflection"], answer: "Conduction" },
    { question: "Why does wet filter paper not catch fire easily?", options: ["It is too thick", "Water increases ignition temperature", "It has no carbon", "It reflects heat"], answer: "Water increases ignition temperature" },
    { question: "What happens when like poles of magnets are brought together?", options: ["They attract", "They repel", "Nothing happens", "They stick"], answer: "They repel" },
    { question: "What happens when opposite poles of magnets are brought together?", options: ["They repel", "Nothing happens", "They attract", "They explode"], answer: "They attract" },
    { question: "How does water pressure change with depth?", options: ["Decreases", "Stays the same", "Increases", "Becomes zero"], answer: "Increases" },
    { question: "Which surface creates more friction?", options: ["Glass", "Plastic", "Sandpaper", "Ice"], answer: "Sandpaper" },
    { question: "What do ball bearings do to friction?", options: ["Increase it", "Eliminate it completely", "Reduce it", "Double it"], answer: "Reduce it" },
    { question: "What causes a tuning fork to produce sound?", options: ["Heat", "Light", "Vibration", "Pressure"], answer: "Vibration" },
    { question: "What type of wave is formed when a slinky is pushed and pulled?", options: ["Transverse", "Longitudinal", "Electromagnetic", "Surface"], answer: "Longitudinal" },
    { question: "What type of wave is formed when a slinky is moved side to side?", options: ["Longitudinal", "Transverse", "Sound", "Radio"], answer: "Transverse" },
    { question: "What does the First Law of Reflection state?", options: ["Angle of incidence equals angle of reflection", "Light travels in curves", "Reflection depends on color", "Light slows down on reflection"], answer: "Angle of incidence equals angle of reflection" },
    { question: "What happens to the number of images as the angle between two mirrors decreases?", options: ["Decreases", "Stays the same", "Increases", "Becomes zero"], answer: "Increases" },
    { question: "What optical device uses multiple reflections to create symmetrical patterns?", options: ["Telescope", "Microscope", "Kaleidoscope", "Periscope"], answer: "Kaleidoscope" },
    { question: "What does a smooth surface do to friction?", options: ["Increases friction", "Creates more resistance", "Reduces friction", "Has no effect"], answer: "Reduces friction" },
    { question: "Which material is flammable?", options: ["Iron", "Copper", "Aluminum", "Paper"], answer: "Paper" },
    { question: "What do lower holes in a water container demonstrate?", options: ["Less pressure", "Greater pressure and stronger flow", "Same pressure", "No flow"], answer: "Greater pressure and stronger flow" },
    { question: "Why are metals good conductors of heat?", options: ["They are heavy", "They have free electrons", "They are shiny", "They are hard"], answer: "They have free electrons" },
    { question: "Why is magnesium ribbon cleaned with sandpaper before burning?", options: ["To make it longer", "To remove the oxide layer", "To make it shine", "To increase weight"], answer: "To remove the oxide layer" },
    { question: "What practical device uses the law of reflection?", options: ["Battery", "Thermometer", "Periscope", "Compass"], answer: "Periscope" },
  ],
  'class8-math': [
    { question: "What is the sum of interior angles of any triangle?", options: ["90°", "180°", "270°", "360°"], answer: "180°" },
    { question: "What is the sum of interior angles of any quadrilateral?", options: ["180°", "270°", "360°", "450°"], answer: "360°" },
    { question: "What does (a + b)² expand to?", options: ["a² + b²", "a² + ab + b²", "a² + 2ab + b²", "2a² + 2b²"], answer: "a² + 2ab + b²" },
    { question: "What does (a² - b²) factor into?", options: ["(a-b)²", "(a+b)(a-b)", "(a+b)²", "(a-b)(a-b)"], answer: "(a+b)(a-b)" },
    { question: "What is the probability of getting heads on a fair coin toss?", options: ["1/4", "1/3", "1/2", "2/3"], answer: "1/2" },
    { question: "What is the sum of all probabilities in a probability distribution?", options: ["0", "0.5", "1", "2"], answer: "1" },
    { question: "In coordinate geometry, what does the x-axis represent?", options: ["Vertical axis", "Horizontal axis", "Diagonal axis", "Circular axis"], answer: "Horizontal axis" },
    { question: "What is the expanded form of (x + y)³?", options: ["x³ + y³", "x³ + 3x²y + 3xy² + y³", "x³ + 2xy + y³", "3x³ + 3y³"], answer: "x³ + 3x²y + 3xy² + y³" },
    { question: "How many faces does a cube have?", options: ["4", "5", "6", "8"], answer: "6" },
    { question: "What is a net of a 3D shape?", options: ["A 3D model", "A 2D layout of all faces", "A graph of the shape", "A shadow of the shape"], answer: "A 2D layout of all faces" },
    { question: "What is the value of x in: x + 5 = 12?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "In a bar graph, what must be true about the width of bars?", options: ["Different widths", "Equal width", "Increasing width", "Decreasing width"], answer: "Equal width" },
    { question: "What does a line graph best show?", options: ["Categories", "Changes over time", "Proportions", "Frequency"], answer: "Changes over time" },
    { question: "What is the product of (x + a)(x + b)?", options: ["x² + ab", "x² + (a+b)x + ab", "x² + ax + b", "x² + abx"], answer: "x² + (a+b)x + ab" },
    { question: "What does experimental probability mean?", options: ["Calculated from theory", "Based on actual trials", "Always equals 0.5", "Based on guessing"], answer: "Based on actual trials" },
    { question: "In algebra tiles, what shape represents x²?", options: ["Rectangle", "Triangle", "Square", "Circle"], answer: "Square" },
    { question: "What is the degree of a polynomial with highest power 2?", options: ["0", "1", "2", "3"], answer: "2" },
    { question: "How many vertices does a quadrilateral have?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What type of relationship does a straight line on a graph show?", options: ["Exponential", "Quadratic", "Linear", "Circular"], answer: "Linear" },
    { question: "What is the value of x in: 2x = 14?", options: ["5", "6", "7", "8"], answer: "7" },
  ],
  'class9-science': [
    { question: "Why are gases more compressible than liquids?", options: ["Gases are lighter", "Gases have larger spaces between particles", "Gases are hotter", "Gases have smaller particles"], answer: "Gases have larger spaces between particles" },
    { question: "What is sublimation?", options: ["Liquid to gas", "Solid directly to gas", "Gas to liquid", "Solid to liquid"], answer: "Solid directly to gas" },
    { question: "Which substance is a common example of sublimation?", options: ["Ice", "Salt", "Camphor", "Sugar"], answer: "Camphor" },
    { question: "What does a saturated NaCl solution have compared to pure water?", options: ["Lower boiling point", "Same boiling point", "Higher boiling point", "No boiling point"], answer: "Higher boiling point" },
    { question: "What is the Tyndall effect?", options: ["Absorption of light", "Scattering of light by colloidal solutions", "Reflection of light", "Refraction of light"], answer: "Scattering of light by colloidal solutions" },
    { question: "What do atoms combine to form?", options: ["Elements", "Molecules", "Compounds only", "Mixtures"], answer: "Molecules" },
    { question: "What determines an atom's chemical properties?", options: ["Neutrons", "Protons", "Valence electrons", "Mass number"], answer: "Valence electrons" },
    { question: "What shape are plant cells typically?", options: ["Circular", "Irregular", "Rectangular", "Triangular"], answer: "Rectangular" },
    { question: "What is osmosis?", options: ["Movement of solutes", "Movement of water through a membrane due to concentration gradient", "Movement of gases", "Movement of heat"], answer: "Movement of water through a membrane due to concentration gradient" },
    { question: "What happens to potato cells in saltwater?", options: ["They gain water", "They stay the same", "They lose water", "They dissolve"], answer: "They lose water" },
    { question: "What type of cells have thick walls for structural support in plants?", options: ["Parenchyma", "Sclerenchyma", "Nerve cells", "Blood cells"], answer: "Sclerenchyma" },
    { question: "What keeps a ball moving in a circular path?", options: ["Gravitational force", "Centripetal force", "Magnetic force", "Friction"], answer: "Centripetal force" },
    { question: "What happens to a ball when its thread in circular motion is released?", options: ["It stops immediately", "It moves in a circle", "It moves in a straight line", "It falls down"], answer: "It moves in a straight line" },
    { question: "What does Newton's First Law state?", options: ["F = ma", "Every action has equal reaction", "Object at rest stays at rest unless acted upon", "Gravity pulls objects down"], answer: "Object at rest stays at rest unless acted upon" },
    { question: "What does Newton's Third Law state?", options: ["F = ma", "Objects fall at same rate", "Every action has an equal and opposite reaction", "Inertia resists motion"], answer: "Every action has an equal and opposite reaction" },
    { question: "What is the formula for gravitational force?", options: ["F = mv", "F = ma", "F = mg", "F = mgh"], answer: "F = mg" },
    { question: "In free fall ignoring air resistance, how do heavy and light objects fall?", options: ["Heavy falls faster", "Light falls faster", "Both fall at same rate", "Neither falls"], answer: "Both fall at same rate" },
    { question: "How is density calculated?", options: ["Mass x Volume", "Mass / Volume", "Volume / Mass", "Mass + Volume"], answer: "Mass / Volume" },
    { question: "What is work calculated as?", options: ["Force + Distance", "Force x Time", "Force x Distance", "Mass x Speed"], answer: "Force x Distance" },
    { question: "At which point of a pendulum is potential energy maximum?", options: ["At the bottom", "At the middle", "At the highest point", "At all points equally"], answer: "At the highest point" },
    { question: "What happens to sound in a vacuum?", options: ["Travels faster", "Travels slower", "Cannot travel", "Travels at light speed"], answer: "Cannot travel" },
    { question: "In which medium does sound travel fastest?", options: ["Gas", "Liquid", "Vacuum", "Solid"], answer: "Solid" },
    { question: "What is an echo?", options: ["Original sound", "Absorbed sound", "Reflected sound heard after delay", "Louder sound"], answer: "Reflected sound heard after delay" },
    { question: "What type of cells transmit signals in the body?", options: ["Muscle cells", "Nerve cells", "Blood cells", "Skin cells"], answer: "Nerve cells" },
    { question: "What does rubbing a comb with cloth generate?", options: ["Heat only", "Magnetic force", "Static electricity", "Sound waves"], answer: "Static electricity" },
  ],
  'class9-math': [
    { question: "What is the sum of angles in any triangle?", options: ["90°", "180°", "270°", "360°"], answer: "180°" },
    { question: "What is the sum of interior angles of a quadrilateral?", options: ["180°", "270°", "360°", "540°"], answer: "360°" },
    { question: "What is the expanded form of (x + y + z)²?", options: ["x² + y² + z²", "x² + y² + z² + 2xy + 2yz + 2xz", "x² + y² + z² + xy + yz", "2x² + 2y² + 2z²"], answer: "x² + y² + z² + 2xy + 2yz + 2xz" },
    { question: "What is the curved surface area of a cylinder?", options: ["πr²h", "2πrh", "2πr²", "πrh"], answer: "2πrh" },
    { question: "What is the total surface area of a cube with side a?", options: ["4a²", "5a²", "6a²", "8a²"], answer: "6a²" },
    { question: "What is the volume relationship between cylinder and cone with same base and height?", options: ["Equal volumes", "Cylinder is twice cone", "Cylinder is three times cone", "Cone is twice cylinder"], answer: "Cylinder is three times cone" },
    { question: "What is the volume of a cone?", options: ["πr²h", "2πr²h", "⅓πr²h", "½πr²h"], answer: "⅓πr²h" },
    { question: "What is the curved surface area of a cone?", options: ["πrl", "2πrl", "πr²l", "2πr²"], answer: "πrl" },
    { question: "What is the remainder theorem used for?", options: ["Finding factors", "Finding remainder when dividing polynomials", "Multiplying polynomials", "Graphing polynomials"], answer: "Finding remainder when dividing polynomials" },
    { question: "If (x + 2) is a factor, what is the remainder when divided by (x + 2)?", options: ["1", "2", "0", "-2"], answer: "0" },
    { question: "What does a coordinate grid help us do?", options: ["Measure angles", "Plot points representing values", "Calculate area", "Find volume"], answer: "Plot points representing values" },
    { question: "What is the expanded form of (x + y)³?", options: ["x³ + y³", "x³ + 3x²y + 3xy² + y³", "x³ + 2x²y + 2xy² + y³", "3x³ + 3y³"], answer: "x³ + 3x²y + 3xy² + y³" },
    { question: "What is the total surface area of a cylinder?", options: ["2πrh", "πr²h", "2πr(h+r)", "πr(h+r)"], answer: "2πr(h+r)" },
    { question: "What is the total surface area of a cone?", options: ["πrl", "πr(l+r)", "2πrl", "2πr(l+r)"], answer: "πr(l+r)" },
    { question: "What is the surface area formula for a cuboid?", options: ["lb + bh + lh", "2(lb + bh + lh)", "2lb + bh", "lbh"], answer: "2(lb + bh + lh)" },
    { question: "In coordinate geometry, what is the y-axis?", options: ["Horizontal axis", "Diagonal axis", "Vertical axis", "Circular axis"], answer: "Vertical axis" },
    { question: "What type of relationship does a straight line graph show?", options: ["Quadratic", "Exponential", "Linear", "Cubic"], answer: "Linear" },
    { question: "What is a polynomial of degree 1 called?", options: ["Constant", "Linear", "Quadratic", "Cubic"], answer: "Linear" },
    { question: "What is a polynomial of degree 2 called?", options: ["Linear", "Constant", "Cubic", "Quadratic"], answer: "Quadratic" },
    { question: "What does factorizing a polynomial mean?", options: ["Adding polynomials", "Breaking it into simpler expressions multiplied together", "Dividing by a constant", "Squaring the polynomial"], answer: "Breaking it into simpler expressions multiplied together" },
  ]
}

const subjects = {
  'class8': [
    { id: 'class8-science', name: 'Science', emoji: '🔬', desc: 'Fibres, combustion, force, friction, sound and light', color: '#6366f1', questions: 25 },
    { id: 'class8-math', name: 'Mathematics', emoji: '🔢', desc: 'Equations, quadrilaterals, algebra and data handling', color: '#a855f7', questions: 20 },
  ],
  'class9': [
    { id: 'class9-science', name: 'Science', emoji: '⚗️', desc: 'Matter, atoms, cells, motion, force and sound', color: '#06b6d4', questions: 25 },
    { id: 'class9-math', name: 'Mathematics', emoji: '📐', desc: 'Polynomials, geometry, surface areas and volumes', color: '#10b981', questions: 20 },
  ]
}

const letters = ['A', 'B', 'C', 'D']
const TIME_PER_QUESTION = 20
const QUESTIONS_PER_QUIZ = 10

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getRandom(arr, n) { return shuffle(arr).slice(0, n) }
function shuffleOptions(q) { return { ...q, options: shuffle(q.options) } }

function getEmoji(score, total) {
  const p = (score / total) * 100
  if (p === 100) return '🏆'
  if (p >= 80) return '🎉'
  if (p >= 60) return '😊'
  if (p >= 40) return '😅'
  return '💪'
}

function getMessage(score, total) {
  const p = (score / total) * 100
  if (p === 100) return 'Perfect score! Incredible!'
  if (p >= 80) return 'Amazing work, well done!'
  if (p >= 60) return 'Good job, keep it up!'
  if (p >= 40) return 'Not bad, keep practicing!'
  return 'Keep going, you will get there!'
}

function getInitials(name) {
  if (!name) return 'U'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function App() {
  const [page, setPage] = useState('signin')
  const [user, setUser] = useState(null)
  const [authChecking, setAuthChecking] = useState(true)
  const [selectedClass, setSelectedClass] = useState(null)
  const [quizCategory, setQuizCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [pendingChoice, setPendingChoice] = useState(null)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)

  // Auth form state
const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizError, setQuizError] = useState('')
  const [answerLog, setAnswerLog] = useState([])
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null)
  const [passcodePrompt, setPasscodePrompt] = useState(null)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [passcodeError, setPasscodeError] = useState('')
  const [lastAttemptId, setLastAttemptId] = useState(null)
  const [teacherFeedback, setTeacherFeedback] = useState('')
  const [allQuizzes, setAllQuizzes] = useState([])
  const [assignForm, setAssignForm] = useState({ quizId: '', startTime: '', endTime: '', passcode: '' })
  const [assignLoading, setAssignLoading] = useState(false)
  const [assignSuccess, setAssignSuccess] = useState('')
  const [studentAttempts, setStudentAttempts] = useState([])
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [feedbackDrafts, setFeedbackDrafts] = useState({})
  const [myAssignments, setMyAssignments] = useState([])
  const [assignmentsLoading, setAssignmentsLoading] = useState(false)
  const [allQuizzesLookup, setAllQuizzesLookup] = useState({})
  const [leaderboardData, setLeaderboardData] = useState([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(false)
  const [leaderboardFilter, setLeaderboardFilter] = useState(null)
  const [myPastAttempts, setMyPastAttempts] = useState([])
  const [classRequestForm, setClassRequestForm] = useState({ nameOverride: '', proposedGroupCode: '' })
  const [classRequestLoading, setClassRequestLoading] = useState(false)
  const [classRequestError, setClassRequestError] = useState('')
  const [myClassStatus, setMyClassStatus] = useState(null)
  const [pendingClassRequests, setPendingClassRequests] = useState([])
  const [approvedClasses, setApprovedClasses] = useState([])
  const [schoolDashLoading, setSchoolDashLoading] = useState(false)
  const [classActionLoading, setClassActionLoading] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function toggleDarkMode() {
    setDarkMode(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    schoolCode: '',
    groupCode: '',
    classLevel: '',
    schoolName: '',
    isNewSchool: false,
    contactPhone: '',
    address: '',
    proposedSchoolCode: ''
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const restoredUser = { uid: firebaseUser.uid, ...userDoc.data() }

            if (restoredUser.schoolCode) {
              const schoolInfo = await getSchoolInfo(restoredUser.schoolCode)
              restoredUser.schoolName = schoolInfo?.name || restoredUser.schoolCode
            }

            setUser(restoredUser)

            if (restoredUser.role === 'school') {
              const status = await getSchoolStatus(restoredUser.schoolCode)
              setPage(status === 'pending' ? 'schoolStillPending' : 'home')
            } else {
              setPage('home')
            }
          }
        } catch (err) {
          console.log('Could not restore session:', err)
        }
      }
      setAuthChecking(false)
    })
    return () => unsubscribe()
  }, [])
useEffect(() => {
    if (page !== 'quiz' || selected) return
    if (timeLeft === 0) {
      setSelected('__timeout__')
      const q = questions[current]
      const newLogEntry = {
        question: q.question,
        selected: '(no answer — time ran out)',
        correct: q.answer,
        isCorrect: false,
        explanation: q.explanation || ''
      }
      const newLog = [...answerLog, newLogEntry]
      setAnswerLog(newLog)
      setTimeout(() => goNext(score, newLog), 1000)
      return
    }

    const t = setTimeout(() => setTimeLeft(x => x - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, page, selected])

  async function handleRequestSchool(e) {
    e.preventDefault()
    if (authLoading) return
    setAuthError('')
    setAuthLoading(true)
    try {
      await requestSchool({
        schoolName: authForm.schoolName,
        contactName: authForm.name,
        contactPhone: authForm.contactPhone,
        address: authForm.address,
        email: authForm.email,
        password: authForm.password,
        proposedSchoolCode: authForm.proposedSchoolCode
      })
      setPage('schoolPending')
    } catch (err) {
      setAuthError(err.message)
    }
    setAuthLoading(false)
  }
async function handleSignUp(e) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      await signUp({
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        role: authForm.role,
        schoolCode: authForm.schoolCode.trim().toUpperCase(),
        groupCode: authForm.groupCode,
        classLevel: authForm.classLevel,
        isNewSchool: authForm.role === 'teacher' && authForm.isNewSchool,
        schoolName: authForm.schoolName
      })
      alert('Account created! Please sign in.')
      setAuthForm({ name: '', email: '', password: '', role: 'student', schoolCode: '', groupCode: '', classLevel: '', schoolName: '', isNewSchool: false })
      setPage('signin')
    } catch (err) {
      setAuthError(err.message)
    }
    setAuthLoading(false)
  }

  async function handleSignIn(e) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      const loggedInUser = await signIn({
        email: authForm.email,
        password: authForm.password
      })

      if (loggedInUser.role === 'school') {
        const status = await getSchoolStatus(loggedInUser.schoolCode)
        if (status === 'pending') {
          setUser(loggedInUser)
          setPage('schoolStillPending')
          setAuthLoading(false)
          return
        }
      }

      // Fetch the real school name for anyone with a schoolCode (used in group name generation)
      if (loggedInUser.schoolCode) {
        const schoolInfo = await getSchoolInfo(loggedInUser.schoolCode)
        loggedInUser.schoolName = schoolInfo?.name || loggedInUser.schoolCode
      }

      setUser(loggedInUser)
      setPage('home')
    } catch (err) {
      setAuthError('Invalid email or password.')
    }
    setAuthLoading(false)
  }

  async function loadLeaderboardData(quizId) {
    setLeaderboardLoading(true)
    setLeaderboardFilter(quizId)
    try {
      const data = await getLeaderboard(user.schoolCode, quizId)
      setLeaderboardData(data)
      if (Object.keys(allQuizzesLookup).length === 0) {
        const quizzes = await getAllQuizzes()
        const lookup = {}
        quizzes.forEach(q => { lookup[q.id] = q })
        setAllQuizzesLookup(lookup)
      }
    } catch (err) {
      console.log('Could not load leaderboard:', err)
    }
    setLeaderboardLoading(false)
  }
  async function loadMyPastAttempts() {
    setAssignmentsLoading(true)
    try {
      const attempts = await getStudentAttempts(user.uid)
      setMyPastAttempts(attempts)
    } catch (err) {
      console.log('Could not load past attempts:', err)
    }
    setAssignmentsLoading(false)
  }
async function loadMyAssignments() {
    setAssignmentsLoading(true)
    try {
      const assignments = await getAssignmentsForClass(user.classCode)
      setMyAssignments(assignments)
      if (Object.keys(allQuizzesLookup).length === 0) {
        const quizzes = await getAllQuizzes()
        const lookup = {}
        quizzes.forEach(q => { lookup[q.id] = q })
        setAllQuizzesLookup(lookup)
      }
    } catch (err) {
      console.log('Could not load assignments:', err)
    }
    setAssignmentsLoading(false)
  }

  function handlePasscodeSubmit(e) {
    e.preventDefault()
    if (passcodeInput.trim() === passcodePrompt.passcode) {
      const assignment = passcodePrompt
      setPasscodePrompt(null)
      startAssignedQuiz(assignment)
    } else {
      setPasscodeError('Incorrect passcode. Ask your teacher for the correct one.')
    }
  }
  async function startAssignedQuiz(assignment) {
    setQuizLoading(true)
    setQuizError('')
    try {
      const quizDoc = await getQuiz(assignment.quizId)
      const raw = getRandom(quizDoc.questions, QUESTIONS_PER_QUIZ)
      const shuffled = raw.map(shuffleOptions)
      setQuestions(shuffled)
      setQuizCategory(assignment.quizId)
      setCurrentAssignmentId(assignment.id)
      setCurrent(0)
      setScore(0)
      setSelected(null)
      setAnswerLog([])
      setTimeLeft(TIME_PER_QUESTION)
      setPage('quiz')
    } catch (err) {
      setQuizError('Could not load quiz questions. Please try again.')
    }
    setQuizLoading(false)
  }
async function loadQuizzesForAssign() {
    try {
      const quizzes = await getAllQuizzes()
      setAllQuizzes(quizzes)
    } catch (err) {
      console.log('Could not load quizzes:', err)
    }
  }

  async function handleCreateAssignment(e) {
    e.preventDefault()
    setAssignLoading(true)
    setAssignSuccess('')
    try {
      await createAssignment({
        quizId: assignForm.quizId,
        schoolCode: user.schoolCode,
        classCode: user.classCode,
        teacherUid: user.uid,
        startTime: assignForm.startTime,
        endTime: assignForm.endTime,
        passcode: assignForm.passcode.trim()
      })
      setAssignSuccess('Quiz assigned successfully!')
      setAssignForm({ quizId: '', startTime: '', endTime: '', passcode: '' })
    } catch (err) {
      setAssignSuccess('Error: ' + err.message)
    }
    setAssignLoading(false)
  }

  async function loadTeacherAnalytics() {
    setAnalyticsLoading(true)
    try {
      const attempts = await getSchoolAttempts(user.schoolCode)
      setStudentAttempts(attempts)
    } catch (err) {
      console.log('Could not load analytics:', err)
    }
    setAnalyticsLoading(false)
  }

  async function saveFeedback(attemptId) {
    const feedbackText = feedbackDrafts[attemptId]
    if (!feedbackText) return
    try {
      await updateDoc(doc(db, 'attempts', attemptId), { teacherFeedback: feedbackText })
      setStudentAttempts(prev =>
        prev.map(a => a.id === attemptId ? { ...a, teacherFeedback: feedbackText } : a)
      )
    } catch (err) {
      console.log('Could not save feedback:', err)
    }
  }
  async function loadSchoolDashboard() {
    setSchoolDashLoading(true)
    try {
      const [pending, approved] = await Promise.all([
        getPendingClassRequests(user.schoolCode),
        getApprovedClasses(user.schoolCode)
      ])
      setPendingClassRequests(pending)
      setApprovedClasses(approved)
    } catch (err) {
      console.log('Could not load school dashboard:', err)
    }
    setSchoolDashLoading(false)
  }

  async function handleApproveClass(request) {
    setClassActionLoading(request.id)
    try {
      await approveClassRequest(request)
      await loadSchoolDashboard()
    } catch (err) {
      alert('Error: ' + err.message)
    }
    setClassActionLoading(null)
  }

  async function handleRejectClass(requestId) {
    setClassActionLoading(requestId)
    try {
      await rejectClassRequest(requestId)
      await loadSchoolDashboard()
    } catch (err) {
      alert('Error: ' + err.message)
    }
    setClassActionLoading(null)
  }
  async function checkMyClassStatus() {
    try {
      const result = await getTeacherGroupStatus(user.uid)
      setMyClassStatus(result)
    } catch (err) {
      console.log('Could not check class status:', err)
    }
  }

  async function handleRequestClass(e) {
    e.preventDefault()
    setClassRequestError('')
    setClassRequestLoading(true)
    try {
      await requestGroup({
        teacherUid: user.uid,
        teacherName: user.name,
        schoolCode: user.schoolCode,
        schoolName: user.schoolName || user.schoolCode,
        proposedGroupCode: classRequestForm.proposedGroupCode,
        nameOverride: classRequestForm.nameOverride
      })
      await checkMyClassStatus()
    } catch (err) {
      setClassRequestError(err.message)
    }
    setClassRequestLoading(false)
  }
  async function handleSignOut() {
    await signOutUser()
    setUser(null)
    setAuthForm({ name: '', email: '', password: '', role: 'student', schoolCode: '' })
    setPage('signin')
  }

async function startQuiz(catId) {
    setQuizLoading(true)
    setQuizError('')
    try {
      const quizDoc = await getQuiz(catId)
      const raw = getRandom(quizDoc.questions, QUESTIONS_PER_QUIZ)
      const shuffled = raw.map(shuffleOptions)
      setQuestions(shuffled)
      setQuizCategory(catId)
      setCurrent(0)
      setScore(0)
      setSelected(null)
      setAnswerLog([])
      setTimeLeft(TIME_PER_QUESTION)
      setPage('quiz')
    } catch (err) {
      setQuizError('Could not load quiz questions. Please try again.')
    }
    setQuizLoading(false)
  }

function handleAnswer(option) {
    if (selected) return
    setSelected(option)
    const q = questions[current]
    const isCorrect = option === q.answer
    const newScore = isCorrect ? score + 1 : score
    if (isCorrect) setScore(newScore)

    const newLogEntry = {
      question: q.question,
      selected: option,
      correct: q.answer,
      isCorrect,
      explanation: q.explanation || ''
    }
    const newLog = [...answerLog, newLogEntry]
    setAnswerLog(newLog)

    setTimeout(() => goNext(newScore, newLog), 1000)
  }

async function goNext(finalScore, finalLog) {
    setSelected(null)
    setPendingChoice(null)
    setTimeLeft(TIME_PER_QUESTION)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      setPage('result')
      try {
        const attemptId = await submitAttempt({
          studentUid: user.uid,
          studentName: user.name,
          assignmentId: currentAssignmentId,
          quizId: quizCategory,
          schoolCode: user.schoolCode,
          score: finalScore,
          totalQuestions: questions.length,
          answers: finalLog
        })
        setLastAttemptId(attemptId)
      } catch (err) {
        console.log('Could not save attempt:', err)
      }
    }
  }

  function goHome() {
    setPage('home')
    setSelectedClass(null)
    setQuizCategory(null)
    setQuestions([])
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setAnswerLog([])
    setTimeLeft(TIME_PER_QUESTION)
  }

  const timerPercent = (timeLeft / TIME_PER_QUESTION) * 100
  const timerColor = timeLeft > 15 ? '#6366f1' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const generatedGroupName = user ? generateGroupName(user.name, user.schoolName || user.schoolCode) : ''
  const submitted = selected !== null
  const activeCat = quizCategory ? [...subjects.class8, ...subjects.class9].find(s => s.id === quizCategory) : null

  // ── SIGN IN ──
  if (page === 'signin') return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#e8eaf0] bg-white px-10 py-11 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl">🧠</div>
        <h2 className="mb-1 text-center text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Welcome back</h2>
       <p className="mb-7 text-center text-sm text-[#888]">Sign in to continue to Prastuti Quiz</p>
        {authError && <p className="mb-4 text-center text-sm font-medium text-red-500">{authError}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Email address</label>
            <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="email" placeholder="you@example.com"
              value={authForm.email}
              onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
              required />
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Password</label>
            <div className="relative">
              <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 pr-11 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type={showPassword ? 'text' : 'password'} placeholder="Enter password"
                value={authForm.password}
                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                required />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button type="submit" disabled={authLoading} className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 disabled:opacity-60" style={{ marginTop: 8 }}>
            {authLoading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-400">
  Don't have an account?{" "}
  <span
    onClick={() => setPage('signup')}
    className="cursor-pointer font-semibold text-indigo-600 hover:underline"
  >
    Sign Up
  </span>
</p>
      </div>
    </div>
  )

  // ── SIGN UP ──
  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb] dark:bg-gray-950">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl animate-pulse">🧠</div>
      </div>
    )
  }
  if (page === 'schoolStillPending') return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#e8eaf0] bg-white px-10 py-11 text-center shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl">⏳</div>
        <h2 className="mb-2 text-2xl font-extrabold text-[#1a1a2e]">Still Under Review</h2>
        <p className="mb-6 text-sm text-[#666]">
          Your school registration is still being reviewed. Please check back later — you'll get full access to your dashboard once it's approved.
        </p>
        <button
          onClick={async () => {
            setAuthLoading(true)
            const status = await getSchoolStatus(user.schoolCode)
            if (status === 'approved') {
              setPage('home')
            } else {
              alert('Still pending. Please check back later.')
            }
            setAuthLoading(false)
          }}
          disabled={authLoading}
          className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
        >
          {authLoading ? 'Checking...' : 'Check Status Again'}
        </button>
        <button
          onClick={() => { setUser(null); setPage('signin') }}
          className="mt-3 w-full rounded-xl border border-gray-300 bg-white py-4 text-sm font-semibold text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
  if (page === 'schoolPending') return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#e8eaf0] bg-white px-10 py-11 text-center shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl">⏳</div>
        <h2 className="mb-2 text-2xl font-extrabold text-[#1a1a2e]">Request Submitted!</h2>
        <p className="mb-6 text-sm text-[#666]">
          Your school registration for <strong>{authForm.schoolName}</strong> has been sent for approval.
          You'll be able to sign in once it's approved — this usually takes a short while.
        </p>
        <button
          onClick={() => {
            setAuthForm({ name: '', email: '', password: '', role: 'student', schoolCode: '', schoolName: '', isNewSchool: false, contactPhone: '', address: '', proposedSchoolCode: '' })
            setPage('signin')
          }}
          className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Go to Sign In →
        </button>
        <p className="mt-4 text-xs text-gray-400">You can come back and sign in anytime to check if you've been approved.</p>
      </div>
    </div>
  )
  if (page === 'signup') return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#e8eaf0] bg-white px-10 py-11 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl">🧠</div>
        <h2 className="mb-1 text-center text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Create account</h2>
        <p className="mb-7 text-center text-sm text-[#888]">Join Prastuti and start your quiz journey</p>
        {authError && <p className="mb-4 text-center text-sm font-medium text-red-500">{authError}</p>}
        <form onSubmit={authForm.role === 'school' ? handleRequestSchool : handleSignUp}>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Full name</label>
            <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="Your name"
              value={authForm.name}
              onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
              required />
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Email address</label>
            <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="email" placeholder="you@example.com"
              value={authForm.email}
              onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
              required />
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Password</label>
            <div className="relative">
              <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 pr-11 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type={showPassword ? 'text' : 'password'} placeholder="Create a password"
                value={authForm.password}
                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                required />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
         <div className="mb-6">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">I am a</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAuthForm({ ...authForm, role: 'student', isNewSchool: false })}
                className={`rounded-[10px] border-[1.5px] py-3 text-xs font-semibold transition-all duration-200 ${authForm.role === 'student' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-[#e8eaf0] bg-[#fafafa] text-[#666]'}`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => setAuthForm({ ...authForm, role: 'teacher' })}
                className={`rounded-[10px] border-[1.5px] py-3 text-xs font-semibold transition-all duration-200 ${authForm.role === 'teacher' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-[#e8eaf0] bg-[#fafafa] text-[#666]'}`}
              >
                📋 Teacher
              </button>
              <button
                type="button"
                onClick={() => setAuthForm({ ...authForm, role: 'school' })}
                className={`rounded-[10px] border-[1.5px] py-3 text-xs font-semibold transition-all duration-200 ${authForm.role === 'school' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-[#e8eaf0] bg-[#fafafa] text-[#666]'}`}
              >
                🏫 School
              </button>
            </div>
          </div>
          {authForm.role === 'school' && (
            <>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">School name</label>
                <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="e.g. Prastuti Demo School"
                  value={authForm.schoolName}
                  onChange={e => setAuthForm({ ...authForm, schoolName: e.target.value })}
                  required />
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Contact phone number</label>
                <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="tel" placeholder="e.g. 9876543210"
                  value={authForm.contactPhone}
                  onChange={e => setAuthForm({ ...authForm, contactPhone: e.target.value })}
                  required />
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">School address</label>
                <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="Full address"
                  value={authForm.address}
                  onChange={e => setAuthForm({ ...authForm, address: e.target.value })}
                  required />
              </div>
              <div className="mb-6">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Choose a school code</label>
                <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="e.g. PRASTUTI2026"
                  value={authForm.proposedSchoolCode}
                  onChange={e => setAuthForm({ ...authForm, proposedSchoolCode: e.target.value })}
                  required />
              </div>
              <div className="mb-4 rounded-xl bg-yellow-50 p-4 text-xs text-yellow-800">
                📋 Your school registration will be reviewed before you can access your dashboard. You'll be notified once approved.
              </div>
            </>
          )}

         {authForm.role === 'teacher' && (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAuthForm({ ...authForm, isNewSchool: true })}
                  className={`rounded-[10px] border-[1.5px] py-2.5 text-xs font-semibold transition-all duration-200 ${authForm.isNewSchool ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-[#e8eaf0] bg-[#fafafa] text-[#666]'}`}
                >
                  ➕ Create new school
                </button>
                <button
                  type="button"
                  onClick={() => setAuthForm({ ...authForm, isNewSchool: false })}
                  className={`rounded-[10px] border-[1.5px] py-2.5 text-xs font-semibold transition-all duration-200 ${!authForm.isNewSchool ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-[#e8eaf0] bg-[#fafafa] text-[#666]'}`}
                >
                  🔗 Join existing school
                </button>
              </div>
            </div>
          )}

          {authForm.role === 'teacher' && authForm.isNewSchool && (
            <div className="mb-4">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">School name</label>
              <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="e.g. Prastuti Demo School"
                value={authForm.schoolName}
                onChange={e => setAuthForm({ ...authForm, schoolName: e.target.value })}
                required />
            </div>
          )}

        {authForm.role === 'student' && (
            <>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Your Class</label>
                <select
                  className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white"
                  value={authForm.classLevel}
                  onChange={e => setAuthForm({ ...authForm, classLevel: e.target.value })}
                  required
                >
                  <option value="">Select your class...</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">Teacher's group code</label>
                <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="e.g. PRAKOTNIT"
                  value={authForm.groupCode}
                  onChange={e => setAuthForm({ ...authForm, groupCode: e.target.value })}
                  required />
                <p className="mt-1.5 text-xs text-gray-500">Ask your teacher for this code</p>
              </div>
            </>
          )}
          {authForm.role === 'teacher' && (
            <div className="mb-6">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#444]">
                {authForm.isNewSchool ? 'Choose a school code' : 'School code'}
              </label>
              <input className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] dark:text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white" type="text" placeholder="e.g. PRASTUTI2026"
                value={authForm.schoolCode}
                onChange={e => setAuthForm({ ...authForm, schoolCode: e.target.value })}
                required />
            </div>
          )}
         <button type="submit" disabled={authLoading} className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 disabled:opacity-60">
            {authLoading
              ? (authForm.role === 'school' ? 'Submitting request...' : 'Creating account...')
              : (authForm.role === 'school' ? 'Submit for Approval →' : 'Create Account →')}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <span onClick={() => { setAuthError(''); setPage('signin') }} className="cursor-pointer font-semibold text-indigo-600 hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  )

  // ── NAVBAR (shared) ──

 // ── NAVBAR (shared) ──
  const Navbar = () => (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex cursor-pointer items-center gap-3" onClick={goHome}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-xl">
          🧠
        </div>
        <div>
          <div className="text-base font-bold text-[#1a1a2e] dark:text-white">Prastuti</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user?.role === 'teacher' ? 'Teacher Dashboard' : 'Quiz Platform'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {user?.role === 'teacher' && (
          <div className="hidden items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 sm:flex dark:border-indigo-900 dark:bg-indigo-950">
            <span className="text-xs text-gray-500 dark:text-gray-400">School code:</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{user?.schoolCode}</span>
          </div>
        )}
        <button
          onClick={toggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={handleSignOut} className="rounded-lg border border-indigo-500 px-5 py-2 text-sm font-semibold text-indigo-500 transition hover:bg-indigo-50 dark:hover:bg-indigo-950">
          Sign Out
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
          {getInitials(user?.name)}
        </div>
      </div>
    </nav>
  )
  // ── HOME ──
  // ── HOME (School) ──
  if (page === 'home' && user?.role === 'school') {
    if (pendingClassRequests.length === 0 && approvedClasses.length === 0 && !schoolDashLoading) loadSchoolDashboard()

    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[1000px] px-6 py-9">
          <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-10 text-white">
            <h1 className="mb-2 text-3xl font-extrabold">School Dashboard 🏫</h1>
            <p className="text-[15px] opacity-90">Review class requests from teachers at your school.</p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-950">⏳</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{pendingClassRequests.length}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pending Requests</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">🏛️</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{approvedClasses.length}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Active Classes</div>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-extrabold text-[#1a1a2e] dark:text-white">Pending Class Requests</h2>

          {schoolDashLoading && <p className="text-sm text-gray-500">Loading...</p>}

          {!schoolDashLoading && pendingClassRequests.length === 0 && (
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-500 dark:text-gray-400">No pending requests right now.</p>
            </div>
          )}

          <div className="mb-8 space-y-3">
            {pendingClassRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <div>
                  <p className="font-bold text-[#1a1a2e] dark:text-white">{req.className} {req.section}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Requested by {req.requestedByName} · Code: {req.proposedClassCode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={classActionLoading === req.id}
                    onClick={() => handleApproveClass(req)}
                    className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
                  >
                    {classActionLoading === req.id ? '...' : '✓ Approve'}
                  </button>
                  <button
                    disabled={classActionLoading === req.id}
                    onClick={() => handleRejectClass(req.id)}
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-extrabold text-[#1a1a2e] dark:text-white">Active Classes</h2>

          {!schoolDashLoading && approvedClasses.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-500 dark:text-gray-400">No classes approved yet.</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {approvedClasses.map(c => (
              <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-bold text-[#1a1a2e] dark:text-white">{c.className} {c.section}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Code: {c.id}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  if (page === 'home' && user?.role === 'teacher') {
    if (myClassStatus === null) checkMyClassStatus()

    if (!user.classCode) {
      return (
        <>
          <Navbar />
          <div className="mx-auto max-w-[600px] px-6 py-9">
            <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-10 text-white">
              <h1 className="mb-2 text-3xl font-extrabold">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
              <p className="text-[15px] opacity-90">You need a class before you can start teaching. Let's set one up.</p>
            </div>

            {myClassStatus?.status === 'pending' && (
              <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-8 text-center">
                <div className="mb-3 text-4xl">⏳</div>
                <h3 className="mb-2 text-lg font-bold text-yellow-800">Class Request Pending</h3>
                <p className="text-sm text-yellow-700">
                  Your request for {myClassStatus.className} {myClassStatus.section} (code: {myClassStatus.proposedClassCode}) is waiting for approval from your school.
                </p>
                <button
                  onClick={checkMyClassStatus}
                  className="mt-4 rounded-xl border border-yellow-300 bg-white px-5 py-2 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100"
                >
                  Check Status Again
                </button>
              </div>
            )}

            {myClassStatus?.status === 'rejected' && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Your last request for {myClassStatus.className} {myClassStatus.section} was rejected. You can submit a new request below.
              </div>
            )}

            {(myClassStatus?.status === 'none' || myClassStatus?.status === 'rejected') && (
              <div className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-2 text-lg font-bold text-[#1a1a2e] dark:text-white">Request Your Group</h3>
                <div className="mb-5 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Your group's <strong>display name</strong> (auto-generated, just for identification): <strong className="text-indigo-600 dark:text-indigo-400">{generatedGroupName}</strong>
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This name is only shown on dashboards — you don't need to share it with anyone. You only need to leave this field blank unless the name is already taken at your school.</p>
                </div>
                {classRequestError && <p className="mb-4 text-sm font-medium text-red-500">{classRequestError}</p>}
                <form onSubmit={handleRequestClass}>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Override display name (only fill this in if you got a "name already taken" error)</label>
                    <input
                      className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      type="text"
                      placeholder="Leave blank normally"
                      value={classRequestForm.nameOverride}
                      onChange={e => setClassRequestForm({ ...classRequestForm, nameOverride: e.target.value })}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Choose YOUR group's invite code</label>
                    <input
                      className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      type="text" placeholder="e.g. PRAKOTNIT"
                      value={classRequestForm.proposedGroupCode}
                      onChange={e => setClassRequestForm({ ...classRequestForm, proposedGroupCode: e.target.value })}
                      required
                    />
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">This is the code you will personally share with all your students — they'll type this exact code when signing up, regardless of which class (8/9/10) or subject they're in.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={classRequestLoading}
                    className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
                  >
                    {classRequestLoading ? 'Submitting...' : 'Submit Request →'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )
    }

    if (studentAttempts.length === 0 && !analyticsLoading) loadTeacherAnalytics()
    if (myAssignments.length === 0 && !assignmentsLoading) loadMyAssignments()

    const totalStudents = new Set(studentAttempts.map(a => a.studentUid)).size
    const avgScore = studentAttempts.length > 0
      ? Math.round(studentAttempts.reduce((sum, a) => sum + a.accuracy, 0) / studentAttempts.length)
      : 0
    const openAssignments = myAssignments.filter(a => getAssignmentStatus(a) === 'open').length

    return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1100px] px-6 py-9 dark:bg-gray-950">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-10 text-white">
          <h1 className="mb-2 text-3xl font-extrabold">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-[15px] opacity-90">Manage quizzes and track your students' progress.</p>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl opacity-20">📋</div>
        </div>

        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950">📅</div>
            <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{openAssignments}</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Active Assignments</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-950">🧑‍🎓</div>
            <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{totalStudents}</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Active Students</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">📝</div>
            <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{studentAttempts.length}</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Total Attempts</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950">🎯</div>
            <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{avgScore}%</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Class Avg Accuracy</div>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-extrabold text-[#1a1a2e] dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setPage('assign')}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white text-left transition duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-28 items-center bg-gradient-to-br from-indigo-500 to-cyan-500 px-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">📅</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-extrabold text-[#1a1a2e] dark:text-white">Assign a Quiz</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">Schedule a quiz for your students with a specific time window</p>
            </div>
          </button>

          <button
            onClick={() => setPage('teacherAnalytics')}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white text-left transition duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-28 items-center bg-gradient-to-br from-purple-500 to-pink-500 px-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">📊</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-extrabold text-[#1a1a2e] dark:text-white">Student Analytics</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">View all your students' scores and quiz attempts</p>
            </div>
          </button>
        </div>
      </div>
    </>
    )
  }
  // ── ASSIGN QUIZ (Teacher) ──
  if (page === 'assign') {
    if (allQuizzes.length === 0) loadQuizzesForAssign()
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[700px] px-6 py-9">
          <button
            onClick={() => setPage('home')}
            className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
          >
            ← Back to Dashboard
          </button>

          <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Assign a Quiz</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Pick a quiz and set the time window students can attempt it in</p>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            {assignSuccess && (
              <p className={`mb-4 text-sm font-medium ${assignSuccess.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
                {assignSuccess}
              </p>
            )}
            <form onSubmit={handleCreateAssignment}>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Quiz</label>
                <select
                  className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  value={assignForm.quizId}
                  onChange={e => setAssignForm({ ...assignForm, quizId: e.target.value })}
                  required
                >
                  <option value="">Select a quiz...</option>
                  {allQuizzes.map(q => (
                    <option key={q.id} value={q.id}>{q.className} — {q.subject}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Available from</label>
                <input
                  type="datetime-local"
                  className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                  value={assignForm.startTime}
                  onChange={e => setAssignForm({ ...assignForm, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Available until</label>
                <input
                  type="datetime-local"
                  className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                  value={assignForm.endTime}
                  onChange={e => setAssignForm({ ...assignForm, endTime: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#444] dark:text-gray-300">Quiz passcode</label>
                <input
                  type="text"
                  className="w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-[15px] text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. 4728"
                  value={assignForm.passcode}
                  onChange={e => setAssignForm({ ...assignForm, passcode: e.target.value })}
                  required
                />
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Students will need to enter this before starting the quiz</p>
              </div>
              <button
                type="submit"
                disabled={assignLoading}
                className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
              >
                {assignLoading ? 'Assigning...' : 'Assign Quiz →'}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  // ── TEACHER ANALYTICS ──
  if (page === 'teacherAnalytics') {
    if (studentAttempts.length === 0 && !analyticsLoading) loadTeacherAnalytics()

    const sortedByScore = [...studentAttempts].sort((a, b) => b.score - a.score)

    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[900px] px-6 py-9">
          <button
            onClick={() => setPage('home')}
            className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
          >
            ← Back to Dashboard
          </button>

          <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Student Analytics</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">All quiz attempts from your school, ranked by score</p>

          {analyticsLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}

          {!analyticsLoading && sortedByScore.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No quiz attempts yet from your students.</p>
          )}

          <div className="space-y-4">
            {sortedByScore.map((a, i) => (
              <div key={a.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-200 text-gray-700' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a2e] dark:text-white">{a.studentName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.quizId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-indigo-600">{a.score}/{a.totalQuestions}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{a.accuracy}% accuracy</p>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">Leave feedback for this student</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                      placeholder="e.g. Great improvement, review chapter 3 again"
                      defaultValue={a.teacherFeedback || ''}
                      onChange={e => setFeedbackDrafts({ ...feedbackDrafts, [a.id]: e.target.value })}
                    />
                    <button
                      onClick={() => saveFeedback(a.id)}
                      className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                  {a.teacherFeedback && (
                    <p className="mt-2 text-xs text-green-600">✓ Feedback saved: "{a.teacherFeedback}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

// ── HOME (Student) ──
// ── LEADERBOARD ──
// ── MY RESULTS (Student) ──
  if (page === 'myResults') {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[800px] px-6 py-9">
          <button
            onClick={() => setPage('home')}
            className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
          >
            ← Back to Home
          </button>

          <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">📊 My Results</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Your past quiz attempts and any feedback from your teacher</p>

          {assignmentsLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}

          {!assignmentsLoading && myPastAttempts.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">You haven't completed any quizzes yet.</p>
            </div>
          )}

          <div className="space-y-4">
            {myPastAttempts.map(a => {
              const quizMeta = allQuizzesLookup[a.quizId]
              return (
                <div key={a.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1a1a2e] dark:text-white">{quizMeta ? `${quizMeta.className} — ${quizMeta.subject}` : a.quizId}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {a.submittedAt?.toDate ? a.submittedAt.toDate().toLocaleString() : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-indigo-600">{a.score}/{a.totalQuestions}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.accuracy}%</p>
                    </div>
                  </div>

                  {a.teacherFeedback ? (
                    <div className="mt-3 rounded-xl bg-indigo-50 p-4">
                      <p className="text-xs font-semibold text-indigo-600">💬 Teacher's Feedback</p>
                      <p className="mt-1 text-sm text-gray-700">{a.teacherFeedback}</p>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs italic text-gray-400">No feedback from your teacher yet.</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  if (page === 'leaderboard') {
    if (leaderboardData.length === 0 && !leaderboardLoading && leaderboardFilter === null) loadLeaderboardData(null)

    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[800px] px-6 py-9">
          <div className="flex gap-2">
              <button
                onClick={() => { loadMyPastAttempts(); setPage('myResults') }}
                className="rounded-xl border-2 border-indigo-500 bg-white px-5 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
              >
                📊 My Results
              </button>
              <button
                onClick={() => { loadLeaderboardData(null); setPage('leaderboard') }}
                className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                🏆 Leaderboard
              </button>
            </div>
          <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">🏆 Leaderboard</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Top scorers at your school</p>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => loadLeaderboardData(null)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${leaderboardFilter === null ? 'bg-indigo-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              All Quizzes
            </button>
            {Object.values(allQuizzesLookup).map(q => (
              <button
                key={q.id}
                onClick={() => loadLeaderboardData(q.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${leaderboardFilter === q.id ? 'bg-indigo-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                {q.className} {q.subject}
              </button>
            ))}
          </div>

          {leaderboardLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}

          {!leaderboardLoading && leaderboardData.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No scores yet. Be the first to complete a quiz!</p>
            </div>
          )}

          <div className="space-y-3">
            {leaderboardData.map((entry, i) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between rounded-2xl border p-5 ${entry.studentUid === user.uid ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-200 text-gray-700' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a2e] dark:text-white">
                      {entry.studentName} {entry.studentUid === user.uid && <span className="text-xs text-indigo-500">(You)</span>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{entry.quizId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-indigo-600">{entry.score}/{entry.totalQuestions}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{entry.accuracy}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
  const PasscodeModal = () => {
    if (!passcodePrompt) return null
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6">
        <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 dark:bg-gray-900">
          <div className="mb-4 text-center text-3xl">🔒</div>
          <h3 className="mb-1 text-center text-lg font-bold text-[#1a1a2e] dark:text-white">Enter Quiz Passcode</h3>
          <p className="mb-5 text-center text-sm text-gray-500 dark:text-gray-400">Ask your teacher for the passcode to begin.</p>
          {passcodeError && <p className="mb-3 text-center text-sm font-medium text-red-500">{passcodeError}</p>}
          <form onSubmit={handlePasscodeSubmit}>
            <input
              autoFocus
              type="text"
              className="mb-4 w-full rounded-[10px] border-[1.5px] border-[#e8eaf0] bg-[#fafafa] px-4 py-3 text-center text-lg tracking-widest text-[#1a1a2e] outline-none focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Enter code"
              value={passcodeInput}
              onChange={e => setPasscodeInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Unlock Quiz →
            </button>
            <button
              type="button"
              onClick={() => setPasscodePrompt(null)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  }
  if (page === 'home') {
    if (myAssignments.length === 0 && !assignmentsLoading) loadMyAssignments()
    if (myPastAttempts.length === 0 && !assignmentsLoading) loadMyPastAttempts()

    return (
      <>
        <Navbar />
        <PasscodeModal />
        <div className="mx-auto max-w-[1100px] px-6 py-9 dark:bg-gray-950">
          <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-10 text-white">
            <h1 className="mb-2 text-3xl font-extrabold">Hello, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-[15px] opacity-90">Here are your assigned quizzes. Good luck!</p>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl opacity-20">🧠</div>
          </div>

<div className="mb-8 grid grid-cols-4 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950">📅</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">
                {myAssignments.filter(a => getAssignmentStatus(a) === 'open').length}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Open Now</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-950">⏳</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">
                {myAssignments.filter(a => getAssignmentStatus(a) === 'upcoming').length}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upcoming</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">✅</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{myPastAttempts.length}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Completed</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950">🎯</div>
              <div className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">
                {myPastAttempts.length > 0
                  ? Math.round(myPastAttempts.reduce((sum, a) => sum + a.accuracy, 0) / myPastAttempts.length)
                  : 0}%
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Avg Accuracy</div>
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Your Assignments</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Quizzes your teacher has scheduled for you</p>
            </div>
            <button
              onClick={() => { loadLeaderboardData(null); setPage('leaderboard') }}
              className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              🏆 Leaderboard
            </button>
          </div>

          {assignmentsLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading assignments...</p>}

          {!assignmentsLoading && myAssignments.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No quizzes have been assigned yet. Check back later!</p>
            </div>
          )}

         <div className="grid grid-cols-2 gap-5">
            {myAssignments.map(a => {
              const status = getAssignmentStatus(a)
              const quizMeta = allQuizzesLookup[a.quizId]
              const isMath = a.quizId?.includes('math')
              const bannerColor = isMath ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-cyan-500'
              const emoji = isMath ? '🔢' : '🔬'
              return (
                <div key={a.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                  <div className={`bg-gradient-to-br ${bannerColor} p-5`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">{emoji}</div>
                  </div>
                  <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      status === 'open' ? 'bg-green-100 text-green-700' : status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {status === 'open' ? '🟢 Open now' : status === 'upcoming' ? '🟡 Upcoming' : '⚪ Closed'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white">{quizMeta ? `${quizMeta.className} — ${quizMeta.subject}` : a.quizId}</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {a.startTime.toDate().toLocaleString()} → {a.endTime.toDate().toLocaleString()}
                  </p>
                  <button
                    disabled={status !== 'open'}
                    onClick={() => { setPasscodePrompt(a); setPasscodeInput(''); setPasscodeError('') }}
                    className="mt-4 w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {status === 'open' ? 'Start Quiz →' : status === 'upcoming' ? 'Not yet available' : 'Time expired'}
                  </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

      
          

  // ── SUBJECTS ──
if (page === "subjects")
  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-[1100px] px-6 py-9 dark:bg-gray-950">

        <button
          onClick={() => setPage("home")}
          className="mb-7 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
        >
          ← Back to Home
        </button>

        <h2 className="text-2xl font-extrabold text-[#1a1a2e] dark:text-white">
          {selectedClass === "class8"
            ? "📗 Class 8"
            : "📙 Class 9"}{" "}
          — Select Subject
        </h2>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Choose a subject to start your 10-question quiz
        </p>

        <div className="grid grid-cols-2 gap-5">

          {subjects[selectedClass].map((subj) => (

            <button
              key={subj.id}
              onClick={() => startQuiz(subj.id)}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-7 text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >

              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                style={{
                  background: subj.color + "18"
                }}
              >
                {subj.emoji}
              </div>

              <div>

                <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white">
                  {subj.name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {subj.desc}
                </p>

              </div>

     <span className="text-sm font-semibold" style={{ color: subj.color }}>
                {subj.questions} Questions • 10 Random Questions →
              </span>
            </button>
          ))}
        </div>
        {quizLoading && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading quiz...</p>}
        {quizError && <p className="mt-4 text-sm font-medium text-red-500">{quizError}</p>}
      </div>
    </>
  )         
  
  // ── QUIZ ──
if (page === "quiz") {
  const q = questions[current]
  const progress = ((current + 1) / questions.length) * 100

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-[700px] px-6 py-8">

        <button
          onClick={goHome}
          className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
        >
          ← Exit Quiz
        </button>

        <div className="rounded-3xl border border-gray-200 bg-white p-9 shadow-lg dark:border-gray-800 dark:bg-gray-900">

          {/* Header */}

          <div className="mb-5 flex items-center justify-between">

            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {activeCat?.emoji} {activeCat?.name} • Question {current + 1} / {questions.length}
            </span>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-600">
              ⭐ {score} pts
            </span>

          </div>

          {/* Progress */}

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

          {/* Timer */}

          <div className="mb-7 flex items-center gap-3">

            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${timerPercent}%`,
                  background: timerColor
                }}
              />

            </div>

            <span
              className="w-8 text-right text-sm font-bold"
              style={{
                color: timerColor
              }}
            >
              {timeLeft}s
            </span>

          </div>

          {/* Question */}

          <h2 className="mb-6 text-2xl font-bold leading-relaxed text-[#1a1a2e] dark:text-white">
            {q.question}
          </h2>

          {/* Options */}

          <div className="space-y-3">

            {q.options.map((option, i) => {

              let classes =
                "flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"

              if (!submitted && pendingChoice === option) {
                classes = "flex w-full items-center gap-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 px-5 py-4 text-left text-indigo-700"
              } else if (!submitted) {
                classes += " hover:translate-x-1 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
              }

              if (submitted) {

                if (option === q.answer) {

                  classes =
                    "flex w-full items-center gap-4 rounded-xl border border-green-500 bg-green-50 px-5 py-4 text-left text-green-800"

                } else if (option === pendingChoice) {

                  classes =
                    "flex w-full items-center gap-4 rounded-xl border border-red-500 bg-red-50 px-5 py-4 text-left text-red-800"

                } else {

                  classes += " opacity-50"

                }
              }

              return (

                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setPendingChoice(option)}
                  className={classes}
                >

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold
                    ${
                      submitted
                        ? option === q.answer
                          ? "border-green-500 bg-green-100 text-green-800"
                          : option === pendingChoice
                          ? "border-red-500 bg-red-100 text-red-800"
                          : "border-gray-300 bg-gray-100 text-gray-400"
                        : pendingChoice === option
                        ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                        : "border-gray-300 bg-gray-100 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {letters[i]}
                  </div>

                  {option}

                </button>

              )

            })}

          </div>

          {!submitted && (
            <button
              onClick={() => handleAnswer(pendingChoice)}
              disabled={!pendingChoice}
              className="mt-6 w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Answer →
            </button>
          )}

        </div>

      </div>

    </>
  )
}

  // ── RESULT ──
  // ── RESULT ──
  // ── REVIEW ──
  if (page === 'review') return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[700px] px-6 py-8">
        <button
          onClick={() => setPage('result')}
          className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:text-indigo-500"
        >
          ← Back to Results
        </button>

        <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a2e] dark:text-white">Review Your Answers</h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {activeCat?.emoji} {activeCat?.name} · {answerLog.filter(a => a.isCorrect).length} of {answerLog.length} correct
        </p>

        <div className="space-y-4">
          {answerLog.map((a, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 ${a.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Question {i + 1}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${a.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {a.isCorrect ? '✅ Correct' : '❌ Wrong'}
                </span>
              </div>

              <p className="mb-4 text-base font-semibold text-[#1a1a2e] dark:text-white">{a.question}</p>

              <div className="mb-2 flex items-start gap-2 text-sm">
                <span className="font-semibold text-gray-500 dark:text-gray-400">Your answer:</span>
                <span className={a.isCorrect ? 'font-medium text-green-700' : 'font-medium text-red-700'}>{a.selected}</span>
              </div>

              {!a.isCorrect && (
                <div className="mb-3 flex items-start gap-2 text-sm">
                  <span className="font-semibold text-gray-500 dark:text-gray-400">Correct answer:</span>
                  <span className="font-medium text-green-700">{a.correct}</span>
                </div>
              )}

              {a.explanation && (
                <div className="mt-3 rounded-xl bg-white/70 p-4 text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">💡 Explanation: </span>
                  {a.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={goHome} className="mt-6 w-full rounded-xl border border-gray-300 bg-white py-4 font-semibold text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600">
          Back to Home
        </button>
      </div>
    </>
  )

  // ── RESULT ──
  if (page === 'result') return (

    <>
      <Navbar />

      <div className="mx-auto max-w-[700px] px-6 py-8">

        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">

          <div className="mb-4 text-6xl">
            {getEmoji(score, questions.length)}
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-[#1a1a2e] dark:text-white">
            {getMessage(score, questions.length)}
          </h1>

          <p className="mb-8 text-gray-500 dark:text-gray-400">
            {activeCat?.emoji} {activeCat?.name} · {questions.length} Questions Completed
          </p>

          {/* Score Circle */}

          <div className="mx-auto mb-8 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl">

            <span className="text-4xl font-black text-white">
              {score}/{questions.length}
            </span>

            <span className="text-xs font-semibold tracking-widest text-white/80">
              SCORE
            </span>

          </div>

          {/* Stats */}

          <div className="mb-8 grid grid-cols-3 gap-4">

            <div className="rounded-xl border border-gray-200 bg-indigo-50 p-5">

              <div className="text-2xl font-extrabold text-[#1a1a2e] dark:text-white">
                ✅ {score}
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Correct
              </div>

            </div>

            <div className="rounded-xl border border-gray-200 bg-red-50 p-5">

              <div className="text-2xl font-extrabold text-[#1a1a2e] dark:text-white">
                ❌ {questions.length - score}
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Wrong
              </div>

            </div>

            <div className="rounded-xl border border-gray-200 bg-green-50 p-5">

              <div className="text-2xl font-extrabold text-[#1a1a2e] dark:text-white">
                🎯 {Math.round((score / questions.length) * 100)}%
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Accuracy
              </div>

            </div>

          </div>

          {/* Buttons */}
          <button
            onClick={() => setPage('review')}
            className="w-full rounded-xl border-2 border-indigo-500 bg-indigo-50 py-4 font-bold text-indigo-600 transition hover:bg-indigo-100"
          >
            📖 Review Answers & Explanations
          </button>

          <button
            onClick={() => {
              setSelectedClass(quizCategory.includes("class8") ? "class8" : quizCategory.includes("class9") ? "class9" : "class10")
              setPage("subjects")
            }}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-4 text-white font-bold transition hover:-translate-y-1 hover:shadow-xl"
          >
            Try Another Subject →
          </button>

          <button onClick={goHome} className="mt-3 w-full rounded-xl border border-gray-300 bg-white py-4 font-semibold text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600">
            Back to Home
          </button>
       </div>
      </div>
    </>
  )
}