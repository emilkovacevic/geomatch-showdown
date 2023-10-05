'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "geoguesser-game.firebaseapp.com",
  projectId: "geoguesser-game",
  storageBucket: "geoguesser-game.appspot.com",
  messagingSenderId: "291637018947",
  appId: "1:291637018947:web:82ded6ab5221c9c8276ff6"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)