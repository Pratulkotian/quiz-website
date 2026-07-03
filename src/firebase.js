import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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

export const db = getFirestore(app)
export const auth = getAuth(app)