// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa6XeNpQJ3jMPqArWkOYGxbDsdLcVlrB8",
  authDomain: "auth-83a5e.firebaseapp.com",
  projectId: "auth-83a5e",
  storageBucket: "auth-83a5e.appspot.com",
  messagingSenderId: "798127492751",
  appId: "1:798127492751:web:372770c3b5f379e9612afa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
export const firestore = getFirestore(app);
