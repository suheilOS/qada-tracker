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
    if(typeof __app_id !== 'undefined') appId = __app_id;
} else {
    // REPLACE THIS WITH YOUR OWN FIREBASE CONFIG FROM CONSOLE
    firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "SENDER_ID",
        appId: "APP_ID"
    };
    console.log("Using placeholder config. Please update script with real Firebase keys.");
}

// Initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
