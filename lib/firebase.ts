'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'fir-666da.firebaseapp.com',
  projectId: 'fir-666da',
  storageBucket: 'fir-666da.appspot.com',
  messagingSenderId: '1079944995558',
  appId: '1:1079944995558:web:669e9f21cc8beffcbb5127',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)