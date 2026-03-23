import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP1wJb9EKkQKB4Ymi3NTyoIpLPzjgLWdY",
  authDomain: "idea-jar-5a666.firebaseapp.com",
  projectId: "idea-jar-5a666",
  storageBucket: "idea-jar-5a666.firebasestorage.app",
  messagingSenderId: "541087161804",
  appId: "1:541087161804:web:fa90f9a818e0eb90f4d169",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Custom additions
export const auth = getAuth(app);
export const db = getFirestore();
export const ideas_collection = collection(db, "ideas");
export const googleProvider = new GoogleAuthProvider();
