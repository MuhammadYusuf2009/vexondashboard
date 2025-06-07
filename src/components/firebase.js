// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIybJJCDKGX5M_ZgHuG5rmc-HI4H4vv9U",
    authDomain: "zeta-rush-439313-p5.firebaseapp.com",
    projectId: "zeta-rush-439313-p5",
    storageBucket: "zeta-rush-439313-p5.firebasestorage.app",
    messagingSenderId: "159269753581",
    appId: "1:159269753581:web:36537f3d452204ac8472e4",
    measurementId: "G-94CN7RF2TG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
