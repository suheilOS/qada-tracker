export const elements = {
    gridContainer: document.getElementById('grid-container'),
    remainingEl: document.getElementById('remainingCount'),
    percentEl: document.getElementById('percentComplete'),
    statusDot: document.getElementById('statusDot'),
    statusText: document.getElementById('statusText'),
    authModal: document.getElementById('auth-modal'),
    setupModal: document.getElementById('setup-modal'),
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    emailInput: document.getElementById('email'),
    passInput: document.getElementById('password'),
    authError: document.getElementById('authError'),
    totalDaysInput: document.getElementById('totalDaysInput'),
    saveTotalBtn: document.getElementById('saveTotalBtn'),
    editTotalBtn: document.getElementById('editTotalBtn')
};

export const renderGrid = (totalDays, completedDays, onToggle) => {
    elements.gridContainer.innerHTML = '';
    let currentDay = totalDays;
    const totalBlocks = Math.ceil(totalDays / 30);

    for (let b = 0; b < totalBlocks; b++) {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'month-block';

        for (let i = 0; i < 30; i++) {
            if (currentDay <= 0) break;

            const dayNum = currentDay;
            const box = document.createElement('div');
            box.className = 'day-box';
            box.textContent = dayNum;
            box.dataset.day = dayNum;

            if (completedDays.has(dayNum)) {
                box.classList.add('completed');
            }

            box.addEventListener('click', () => onToggle(dayNum, box));

            blockDiv.appendChild(box);
            currentDay--;
        }
        elements.gridContainer.appendChild(blockDiv);
    }
};

export const updateStats = (totalDays, completedCount) => {
    const remaining = totalDays - completedCount;
    const percent = totalDays > 0 ? ((completedCount / totalDays) * 100).toFixed(1) : 0;

    elements.remainingEl.textContent = remaining;
    elements.percentEl.textContent = `${percent}%`;
    document.title = `${remaining} Left - Qada Tracker`;
};

export const setAuthStatus = (isLoggedIn) => {
    if (isLoggedIn) {
        document.body.classList.remove('auth-active');
        elements.logoutBtn.style.display = 'block';
        elements.statusText.textContent = 'Synced';
        elements.statusDot.className = 'status-indicator online';
    } else {
        document.body.classList.add('auth-active');
        elements.logoutBtn.style.display = 'none';
        elements.statusText.textContent = 'Waiting for Login...';
        elements.statusDot.className = 'status-indicator offline';
    }
};

export const showSetupModal = () => {
    document.body.classList.add('modal-active');
};

export const hideSetupModal = () => {
    document.body.classList.remove('modal-active');
};
