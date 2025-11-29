import { initAuth, login, logout, subscribeToAuthChanges } from './auth.js';
import { subscribeToUserData, saveProgress, saveTotalDays } from './db.js';
import { elements, renderGrid, updateStats, setAuthStatus, showSetupModal, hideSetupModal } from './ui.js';

let currentUser = null;
let completedDays = new Set();
let totalDays = 0;
let unsubscribeSnapshot = null;

// --- Logic ---

const handleDataUpdate = (data) => {
    if (data) {
        if (data.totalDays) {
            totalDays = data.totalDays;
            hideSetupModal();
        } else {
            // User exists but hasn't set total days yet
            showSetupModal();
        }

        if (data.completedList) {
            completedDays = new Set(data.completedList);
        } else {
            completedDays.clear();
        }
    } else {
        // New user document
        showSetupModal();
        completedDays.clear();
        totalDays = 0;
    }

    // Only render if we have a valid totalDays
    if (totalDays > 0) {
        renderGrid(totalDays, completedDays, handleDayToggle);
        updateStats(totalDays, completedDays.size);
    }
};

const handleDayToggle = async (dayNum, element) => {
    if (!currentUser) return;

    const wasCompleted = completedDays.has(dayNum);

    if (wasCompleted) {
        completedDays.delete(dayNum);
        element.classList.remove('completed');
    } else {
        completedDays.add(dayNum);
        element.classList.add('completed');
    }

    updateStats(totalDays, completedDays.size);

    try {
        await saveProgress(currentUser.uid, Array.from(completedDays));
    } catch (err) {
        console.error("Failed to save:", err);
        // Revert UI
        if (wasCompleted) {
            completedDays.add(dayNum);
            element.classList.add('completed');
        } else {
            completedDays.delete(dayNum);
            element.classList.remove('completed');
        }
        updateStats(totalDays, completedDays.size);
        alert("Sync failed. Check connection.");
    }
};

// --- Event Listeners ---

elements.loginBtn.addEventListener('click', async () => {
    const email = elements.emailInput.value;
    const pass = elements.passInput.value;
    elements.authError.style.display = 'none';

    try {
        await login(email, pass);
    } catch (error) {
        elements.authError.textContent = error.message;
        elements.authError.style.display = 'block';
    }
});

elements.logoutBtn.addEventListener('click', () => logout());

elements.saveTotalBtn.addEventListener('click', async () => {
    const val = parseInt(elements.totalDaysInput.value);
    if (val && val > 0) {
        totalDays = val;
        await saveTotalDays(currentUser.uid, totalDays);
        hideSetupModal();
        renderGrid(totalDays, completedDays, handleDayToggle);
        updateStats(totalDays, completedDays.size);
    } else {
        alert("Please enter a valid number.");
    }
});

// Optional: Allow editing total later (hidden feature for now, or add a button in UI)
// You can manually call this from console or add a button: document.getElementById('editTotalBtn').click()

// --- Initialization ---

subscribeToAuthChanges((user) => {
    currentUser = user;
    if (user) {
        setAuthStatus(true);
        if (unsubscribeSnapshot) unsubscribeSnapshot();
        unsubscribeSnapshot = subscribeToUserData(user.uid, handleDataUpdate, (error) => {
            console.error("Sync Error:", error);
            elements.statusText.textContent = "Sync Error";
            elements.statusDot.className = "status-indicator offline";
        });
    } else {
        setAuthStatus(false);
        if (unsubscribeSnapshot) unsubscribeSnapshot();
        completedDays.clear();
        totalDays = 0;
        elements.gridContainer.innerHTML = ''; // Clear grid
        updateStats(0, 0);
    }
});

initAuth();
