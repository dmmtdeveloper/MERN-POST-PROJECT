// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-c29c6.firebaseapp.com",
  projectId: "mern-project-c29c6",
  storageBucket: "mern-project-c29c6.appspot.com",
  messagingSenderId: "288005314207",
  appId: "1:288005314207:web:d96713dd274076908e34aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
