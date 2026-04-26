import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { habits } from '../stores/habits';
import { HabitCard } from './HabitCard';
import '../styles/habit-list.css';

export function HabitList() {
  const [habitList, setHabitList] = useState([...habits.value]);

  useEffect(() => {
    // Subscribe to habit changes with proper cleanup
    const unsubscribe = habits.subscribe((newHabits) => {
      setHabitList([...newHabits]);
    });

    // Return cleanup function to unsubscribe
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []); // Run only once on mount

  const handleDelete = (id) => {
    // Component will re-render via subscription
  };

  if (habitList.length === 0) {
    return (
      <div className="empty-state">
        <h2>No habits yet 🌟</h2>
        <p>Create your first habit to get started!</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habitList.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onDelete={handleDelete} />
      ))}
    </div>
  );
}
