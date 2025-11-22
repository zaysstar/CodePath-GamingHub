// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJlNqixf_mQWZW3FWszG9I5EjxhsxDg48",
  authDomain: "codepath-gaminghub.firebaseapp.com",
  projectId: "codepath-gaminghub",
  storageBucket: "codepath-gaminghub.firebasestorage.app",
  messagingSenderId: "19923641542",
  appId: "1:19923641542:web:1d711e172c1e48f767e3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export the database variable so we can use it elsewhere
export const db = getFirestore(app);