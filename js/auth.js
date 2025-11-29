import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithCustomToken
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

export const initAuth = async () => {
    // If we are in the Preview environment, use the special token
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
    }
    // Note: For your localhost/Vercel usage, the code will just wait for you to login manually via the Modal.
};

export const login = async (email, pass) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            // If user doesn't exist, try to create account (Simplified flow)
            await createUserWithEmailAndPassword(auth, email, pass);
        } else {
            throw error;
        }
    }
};

export const logout = () => signOut(auth);

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};
