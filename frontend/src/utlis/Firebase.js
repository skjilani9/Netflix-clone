import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGCm3MFxS3Z-36sdYU4D_XoJEoFwUD104",
  authDomain: "my-netflix-clone-91b27.firebaseapp.com",
  projectId: "my-netflix-clone-91b27",
  storageBucket: "my-netflix-clone-91b27.appspot.com",
  messagingSenderId: "764339094610",
  appId: "1:764339094610:web:312c9b14ed53fbc5404b8b",
  measurementId: "G-009RSZVQCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);