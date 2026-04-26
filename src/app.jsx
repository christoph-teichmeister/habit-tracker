import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { loadHabits } from './stores/habits';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitList } from './components/HabitList';
import './app.css';

export function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load immediately without try-catch to see errors
    loadHabits();
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>☑️ Habit Tracker</h1>
        <p>Build better habits one day at a time</p>
      </header>

      <main className="app-main">
        {mounted ? (
          <>
            <AddHabitForm onSubmit={() => {}} />
            <HabitList />
          </>
        ) : (
          <div style="text-align: center; padding: 40px; color: #999;">
            <p>Loading...</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>All data stored locally • Works offline • No account needed</p>
      </footer>
    </div>
  );
}
