import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTT3e1X3TB0T6wZGOZT96E0cssvfJ50nw",
  authDomain: "react-blog-6b826.firebaseapp.com",
  projectId: "react-blog-6b826",
  storageBucket: "react-blog-6b826.appspot.com",
  messagingSenderId: "553022372037",
  appId: "1:553022372037:web:e599fcb0907f025d6c58ac",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
