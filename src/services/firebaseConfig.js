// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi7AVbkOaeHy0SmcXtOJ0Yni4ESn7qz5c",
  authDomain: "react-proyecto-dsm.firebaseapp.com",
  databaseURL: "https://react-proyecto-dsm-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-proyecto-dsm",
  storageBucket: "react-proyecto-dsm.appspot.com",
  messagingSenderId: "379078038219",
  appId: "1:379078038219:web:1e3bf209ffe3297e85014e"
};

// 🔥 Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 🔹 Inicializa Firestore

export { db };
