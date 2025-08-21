// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- add this

const firebaseConfig = {
  apiKey: "AIzaSyB1Qbjat-qlLH_YiYXmTDwmHLVzygcY7tQ",
  authDomain: "study-time-2004.firebaseapp.com",
  projectId: "study-time-2004",
  storageBucket: "study-time-2004.appspot.com",
  messagingSenderId: "708874294832",
  appId: "1:708874294832:web:4d8636b6fa0f3e0c86bff5",
  measurementId: "G-KME9K9WTW7"
};

const app = initializeApp(firebaseConfig);

// ✅ Exports
export const db = getFirestore(app); // <-- add this line
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
