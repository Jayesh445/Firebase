// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcOwnKTxfzCdi_7vXLIyU--ObcyNOjP5k",
  authDomain: "first-app-719cf.firebaseapp.com",
  projectId: "first-app-719cf",
  storageBucket: "first-app-719cf.appspot.com",
  messagingSenderId: "918658708866",
  appId: "1:918658708866:web:8e18f237460db6b7d08b9b",
  measurementId: "G-E66J9HWMX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);