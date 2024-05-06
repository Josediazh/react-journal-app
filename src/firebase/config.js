// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp53WWW_EHrX8P0C2Xxt9BMkyi-iR-88c",
  authDomain: "react-journalapp-c0a31.firebaseapp.com",
  projectId: "react-journalapp-c0a31",
  storageBucket: "react-journalapp-c0a31.appspot.com",
  messagingSenderId: "807649810932",
  appId: "1:807649810932:web:8cbc49dcfd7146ab1e41a1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
