// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDBbsDsentA8m1FMVpIOUOt08Q9YNdlEQA",
  authDomain: "expense-7.firebaseapp.com",
  projectId: "expense-7",
  storageBucket: "expense-7.firebasestorage.app",
  messagingSenderId: "280453535513",
  appId: "1:280453535513:web:b16898487b321b4970d788",
  measurementId: "G-LD1RP18S6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);