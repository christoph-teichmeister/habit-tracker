import { h } from 'preact';
import { getLastCompletionDate, formatLastCompletion } from '../stores/habits';
import '../styles/modal.css';

export function HabitInfoModal({ habit, streak, onClose }) {
  const lastCompletion = getLastCompletionDate(habit.id);
  const completions = habit.completionCount || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">{habit.name}</h2>

        <div className="habit-info-grid">
          <div className="info-item">
            <span className="info-label">Current Streak</span>
            <span className="info-value">
              {streak > 0 ? (
                <>
                  <span className="fire">🔥</span> {streak} days
                </>
              ) : (
                'No streak yet'
              )}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Last Completed</span>
            <span className="info-value">{formatLastCompletion(lastCompletion)}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Interval</span>
            <span className="info-value" style="text-transform: capitalize;">
              {habit.interval}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Created</span>
            <span className="info-value">
              {new Date(habit.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <p className="info-message">
            Keep it up! You're building great habits. 💪
          </p>
        </div>
      </div>
    </div>
  );
}
