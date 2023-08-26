const { getDatabase, ref, get, child, update } = require("firebase/database");
const { initializeApp } = require("firebase/app");

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
const db = getDatabase(app);
module.exports = db;