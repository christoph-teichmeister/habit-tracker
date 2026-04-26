import { h } from 'preact';
import { habits } from '../stores/habits';
import { HabitCard } from './HabitCard';
import '../styles/habit-list.css';

export function HabitList() {
  const habitList = habits.value;

  if (habitList.length === 0) {
    return (
      <div className="empty-state">
        <h2>No habits yet</h2>
        <p>Create your first habit to get started! 🚀</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habitList.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
