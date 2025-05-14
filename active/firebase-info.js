// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE8iictKO9DxGiB5YolWq5ZOfVBdqgwaI",
  authDomain: "sp-v2-899a3.firebaseapp.com",
  projectId: "sp-v2-899a3",
  storageBucket: "sp-v2-899a3.firebasestorage.app",
  messagingSenderId: "481680193086",
  appId: "1:481680193086:web:20730bc623f399133a436f",
  measurementId: "G-Q1N35C57EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
