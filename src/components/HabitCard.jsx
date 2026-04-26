import { h } from 'preact';
import { useState } from 'preact/hooks';
import { completeHabit, undoCompletion, isCompletedToday, getStreak, getLastCompletionDate, formatLastCompletion, deleteHabit } from '../stores/habits';
import { Confetti } from './Confetti';
import '../styles/habit-card.css';

export function HabitCard({ habit, onDelete }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [undoVisible, setUndoVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
    onDelete?.(habit.id);
  };

  if (showDeleteConfirm) {
    return (
      <div className="habit-card delete-confirm">
        <h4>Delete "{habit.name}"?</h4>
        <p>This action cannot be undone.</p>
        <div className="confirm-actions">
          <button className="btn-confirm-yes" onClick={confirmDelete}>
            Delete
          </button>
          <button className="btn-confirm-no" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`habit-card ${completed ? 'completed' : ''}`}>
      {showConfetti && <Confetti />}
      
      <div className="habit-header">
        <h3 className="habit-name">{habit.name}</h3>
        <button className="delete-btn" onClick={handleDelete} title="Delete habit">
          ✕
        </button>
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

      <div className="habit-interval-badge">{habit.interval}</div>

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
