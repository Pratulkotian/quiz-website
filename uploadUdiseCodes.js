import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDrj9GkCqTltKkcMWgNECFcTs0lXNHXNRU",
  authDomain: "prastuti-quiz.firebaseapp.com",
  projectId: "prastuti-quiz",
  storageBucket: "prastuti-quiz.firebasestorage.app",
  messagingSenderId: "214514645163",
  appId: "1:214514645163:web:806b39238086dd8f6d5fee",
  measurementId: "G-VTY262XW6Z"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Add or change your codes here — must be exactly 11 digits each
const udiseCodes = [
  '12345678901',
  '23456789012',
  '34567890123'
]

async function uploadCodes() {
  for (const code of udiseCodes) {
    await setDoc(doc(db, 'validUdiseCodes', code), {
      used: false,
      usedBySchoolCode: null
    })
    console.log(`Created UDISE code: ${code}`)
  }
  console.log('\nAll UDISE codes uploaded successfully!')
  process.exit(0)
}

uploadCodes().catch(err => {
  console.error('Upload failed:', err)
  process.exit(1)
})
