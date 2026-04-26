# Habit Tracker 🪐

A lightweight PWA for tracking daily habits with device-local storage and celebratory animations.

## Tech Stack

- **Frontend**: Preact + Signals
- **Build**: Vite
- **Storage**: localStorage / IndexedDB
- **PWA**: Workbox (service worker setup)
- **State**: Preact Signals (reactive, lightweight)

## Setup

### Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
├── main.jsx          # Entry point
├── app.jsx           # Main App component
├── components/       # Reusable UI components
├── hooks/            # Custom Preact hooks
├── stores/           # Signals-based state
├── utils/            # Helpers (storage, dates, etc.)
└── styles/           # CSS files
```

## Features (MVP)

- ✅ Add, edit, delete habits
- ✅ Mark habits as completed with celebratory animation
- ✅ View all habits with streak count
- ✅ Persistent local storage
- ✅ Mobile-responsive design
- ✅ Installable PWA

## Development

See GitHub Issues for user stories and tasks:
- #2: Add & Manage Habits
- #3: Track Habit Completion  
- #4: View Habit Overview

---

Built with ❤️ using Preact + Signals
