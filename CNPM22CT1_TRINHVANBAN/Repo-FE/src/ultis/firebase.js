// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "repo-fe-db292.firebaseapp.com",
    projectId: "repo-fe-db292",
    storageBucket: "repo-fe-db292.appspot.com",
    messagingSenderId: "186140532157",
    appId: "1:186140532157:web:7cf5004331e015ab25c6d4",
    measurementId: "G-M0PNX80VYJ"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Storage instance
const storage = getStorage(app);

export { app, storage };
