import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { loadHabits } from './stores/habits';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitList } from './components/HabitList';
import './app.css';

export function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      loadHabits();
      setMounted(true);
    } catch (err) {
      console.error('Failed to load:', err);
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return h('div', { className: 'loading' }, 'Loading...');
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>☑️ Habit Tracker</h1>
        <p>Build better habits one day at a time</p>
      </header>

      <main className="app-main">
        <AddHabitForm onSubmit={() => {}} />
        <HabitList />
      </main>
    </div>
  );
}
