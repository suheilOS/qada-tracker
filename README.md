# Qada Prayer Tracker

A minimalist web application to track and manage missed prayers (Qada) with real-time cloud synchronization across devices.

## Features

- 📊 **Visual Progress Tracking** - Grid-based interface showing all days at a glance
- ☁️ **Cloud Sync** - Real-time synchronization using Firebase Firestore
- 🔐 **User Authentication** - Secure email/password authentication with Firebase Auth
- 📱 **Responsive Design** - Clean, modern UI that works on all devices
- ⚡ **Real-time Updates** - Instant sync across all logged-in devices
- 🎯 **Progress Statistics** - Track remaining days and completion percentage
- ✅ **Simple Interface** - Click to mark days as completed

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 modules)
- **Backend**: Firebase (Firestore + Authentication)
- **Styling**: CSS3 with custom properties
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
qada-tracker/
├── css/
│   └── style.css          # Application styles
├── js/
│   ├── app.js             # Main application logic
│   ├── auth.js            # Authentication handlers
│   ├── db.js              # Firestore database operations
│   ├── firebase-config.js # Firebase configuration
│   └── ui.js              # UI rendering functions
├── index.html             # Main HTML file
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qada-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `js/firebase-config.js` file with your Firebase credentials:
```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = "YOUR_APP_ID";
```

4. Serve the application using a local server (required for ES6 modules):
```bash
npx serve
```

## Usage

1. **First Time Setup**:
   - Enter your email and password to sign in or create an account
   - Set the total number of days you need to track

2. **Tracking Progress**:
   - Click on any day box to mark it as completed (green checkmark)
   - Click again to unmark
   - Progress syncs automatically across all your devices

3. **View Statistics**:
   - See remaining days count in the header
   - Track your completion percentage
   - Monitor sync status with the indicator dot

## Firebase Setup

### Firestore Structure

```
artifacts/
  └── {appId}/
      └── users/
          └── {userId}/
              └── data/
                  └── qada_progress/
                      ├── totalDays: number
                      ├── completedList: array<number>
                      └── lastUpdated: timestamp
```

### Authentication

- Email/Password authentication enabled
- Auto-registration on first login attempt

## Features in Detail

### Visual Grid Layout
- Days are organized in blocks of 30 (roughly monthly)
- Each box represents one day
- Countdown format (starts from total days, counts down)
- Visual highlight for every 10th day

### Real-time Sync
- Uses Firestore's `onSnapshot` for live updates
- Optimistic UI updates with error rollback
- Connection status indicator (green/amber/red)

### Responsive Design
- Sticky header with stats
- Modals for authentication and setup
- Clean, minimalist interface
- Smooth animations and transitions

## Browser Support

- Modern browsers with ES6 module support
- Chrome, Firefox, Safari, Edge (latest versions)

## Dependencies

- `firebase`: ^12.6.0

## License

This project is open source and available for personal use.

## Contributing

Contributions, issues, and feature requests are welcome!

## Acknowledgments

- Built with Firebase for reliable cloud infrastructure
- Inspired by the need for simple, effective habit tracking
