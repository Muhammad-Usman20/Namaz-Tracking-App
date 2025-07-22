// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCMkDB4Wblx5Lhqblv-zDcrwWz1kPfApg",
    authDomain: "web-dev-course-42f1f.firebaseapp.com",
    projectId: "web-dev-course-42f1f",
    storageBucket: "web-dev-course-42f1f.firebasestorage.app",
    messagingSenderId: "695312263707",
    appId: "1:695312263707:web:055cdd95a818c37c0066be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, setDoc, getDoc, updateDoc, collection, getDocs };
