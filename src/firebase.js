// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBbUbtRaTTHi0NhF-9ih6r15v4T4kUJaP0",
  authDomain: "skypro-fitness-project.firebaseapp.com",
  databaseURL: "https://skypro-fitness-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "skypro-fitness-project",
  storageBucket: "skypro-fitness-project.appspot.com",
  messagingSenderId: "1051969473321",
  appId: "1:1051969473321:web:79233414b4890d459b0538"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Exports a database access structure
export const firebaseDataBase = getDatabase(app);
