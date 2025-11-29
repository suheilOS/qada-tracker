import {
    doc,
    setDoc,
    onSnapshot,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db, appId } from "./firebase-config.js";

export const subscribeToUserData = (userId, onData, onError) => {
    // Path: artifacts/{appId}/users/{userId}/data/qada_progress
    const docRef = doc(db, 'artifacts', appId, 'users', userId, 'data', 'qada_progress');

    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            onData(docSnap.data());
        } else {
            onData(null); // New user or no data
        }
    }, onError);
};

export const saveProgress = async (userId, completedList) => {
    const docRef = doc(db, 'artifacts', appId, 'users', userId, 'data', 'qada_progress');
    await setDoc(docRef, {
        completedList: completedList,
        lastUpdated: new Date()
    }, { merge: true });
};

export const saveTotalDays = async (userId, totalDays) => {
    const docRef = doc(db, 'artifacts', appId, 'users', userId, 'data', 'qada_progress');
    await setDoc(docRef, {
        totalDays: parseInt(totalDays),
        lastUpdated: new Date()
    }, { merge: true });
};
