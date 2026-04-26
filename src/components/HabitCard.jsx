import { h } from 'preact';
import { useState } from 'preact/hooks';
import { completeHabit, undoCompletion, isCompletedToday, getStreak, getLastCompletionDate, formatLastCompletion } from '../stores/habits';
import { Confetti } from './Confetti';
import '../styles/habit-card.css';

export function HabitCard({ habit }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [undoVisible, setUndoVisible] = useState(false);

  const completed = isCompletedToday(habit.id);
  const streak = getStreak(habit.id);
  const lastCompletion = getLastCompletionDate(habit.id);

  const handleComplete = () => {
    const success = completeHabit(habit.id);
    if (success) {
      setShowConfetti(true);
      setUndoVisible(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setTimeout(() => setUndoVisible(false), 3000);
    }
  };

  const handleUndo = () => {
    undoCompletion(habit.id);
    setUndoVisible(false);
  };

  return (
    <div className={`habit-card ${completed ? 'completed' : ''}`}>
      {showConfetti && <Confetti />}
      
      <div className="habit-header">
        <h3 className="habit-name">{habit.name}</h3>
        <span className="habit-interval">{habit.interval}</span>
      </div>

      <div className="habit-stats">
        <div className="stat">
          <span className="stat-label">Streak</span>
          <span className="stat-value">{streak} 🔥</span>
        </div>
        <div className="stat">
          <span className="stat-label">Last</span>
          <span className="stat-value">{formatLastCompletion(lastCompletion)}</span>
        </div>
      </div>

      <button
        className={`complete-btn ${completed ? 'completed' : ''}`}
        onClick={handleComplete}
        disabled={completed}
      >
        {completed ? '✓ Done Today' : 'Mark Complete'}
      </button>

      <div className={`undo-wrapper ${undoVisible ? 'visible' : ''}`}>
        <button className="undo-btn" onClick={handleUndo}>
          Undo
        </button>
      </div>
    </div>
  );
}
