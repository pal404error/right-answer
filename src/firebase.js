import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcM_EN9bGCWVtyWDUjMfg3Tp0_4DrBSRE",
  authDomain: "right-answer-86fcd.firebaseapp.com",
  projectId: "right-answer-86fcd",
  storageBucket: "right-answer-86fcd.appspot.com",
  messagingSenderId: "745024301317",
  appId: "1:745024301317:web:01eafdedfe3ca562bb6f6c",
  measurementId: "G-0WV2XNVXWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export const db = getDatabase(app);
export const storage = getStorage(app);
export {auth, provider};