import { h } from 'preact';
import { useState } from 'preact/hooks';
import { habits } from '../stores/habits';
import { HabitCard } from './HabitCard';
import '../styles/habit-list.css';

export function HabitList() {
  const [habitList, setHabitList] = useState(habits.value);

  const handleDelete = (id) => {
    setHabitList(habits.value);
  };

  // Subscribe to habit changes
  habits.subscribe((newHabits) => {
    setHabitList([...newHabits]);
  });

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
