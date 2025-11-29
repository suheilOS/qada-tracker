import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- CONFIGURATION ---
// 1. If running in Artifacts Preview, we use the injected config.
// 2. If hosting yourself (Vercel/Netlify), replace the "else" block with your real config.
let firebaseConfig;
export let appId = 'default-app';

if (typeof __firebase_config !== 'undefined') {
    firebaseConfig = JSON.parse(__firebase_config);
    if (typeof __app_id !== 'undefined') appId = __app_id;
} else {
    firebaseConfig = {
        apiKey: "AIzaSyDeUajicP8DQTeW1vub8uWHTnNkyO9yLjU",
        authDomain: "qada-tracker-54a0c.firebaseapp.com",
        projectId: "qada-tracker-54a0c",
        storageBucket: "qada-tracker-54a0c.firebasestorage.app",
        messagingSenderId: "245290433886",
        appId: "1:245290433886:web:9c0c5f39786d66dad463cf"
    };
    console.log("Using placeholder config. Please update script with real Firebase keys.");
}

// Initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
