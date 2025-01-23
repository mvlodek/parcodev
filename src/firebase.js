// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7qxPxPAd2UHGYr7pxn-lZFyixriKO0v4",
  authDomain: "parco-37168.firebaseapp.com",
  projectId: "parco-37168",
  storageBucket: "parco-37168.firebasestorage.app",
  messagingSenderId: "340441299469",
  appId: "1:340441299469:web:86113b64f202c033c33344",
  measurementId: "G-TPV79FDTNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);