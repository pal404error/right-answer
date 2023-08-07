// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcM_EN9bGCWVtyWDUjMfg3Tp0_4DrBSRE",
  authDomain: "right-answer-86fcd.firebaseapp.com",
  projectId: "right-answer-86fcd",
  storageBucket: "right-answer-86fcd.appspot.com",
  messagingSenderId: "745024301317",
  appId: "1:745024301317:web:01eafdedfe3ca562bb6f6c",
  measurementId: "G-0WV2XNVXWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);