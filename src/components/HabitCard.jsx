import { h } from 'preact';
import { useState } from 'preact/hooks';
import { completeHabit, undoCompletion, isCompletedToday, getStreak, deleteHabit } from '../stores/habits';
import { AnimationContainer } from './AnimationContainer';
import { HabitInfoModal } from './HabitInfoModal';
import '../styles/habit-card.css';

const ANIMATIONS = [
  'confetti',
  'bounce-glow',
  'particle-explosion',
  'rainbow-wave',
  'star-spiral',
  'fireworks',
  'floating-hearts'
];

function getRandomAnimation() {
  return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
}

export function HabitCard({ habit, onDelete }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState('confetti');
  const [undoVisible, setUndoVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const completed = isCompletedToday(habit.id);
  const streak = getStreak(habit.id);

  const handleCardClick = (e) => {
    if (e.target.closest('.delete-btn') || showDeleteConfirm) {
      return;
    }
    
    if (completed) {
      // Click on a done task shows info modal
      setShowInfoModal(true);
    } else {
      // Click on undone task marks it complete
      const success = completeHabit(habit.id);
      if (success) {
        const animation = getRandomAnimation();
        setAnimationType(animation);
        setShowAnimation(true);
        setUndoVisible(true);
        setTimeout(() => setShowAnimation(false), 4000);
        setTimeout(() => setUndoVisible(false), 4500);
      }
    }
  };

  const handleUndo = (e) => {
    e.stopPropagation();
    undoCompletion(habit.id);
    setUndoVisible(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
    onDelete?.(habit.id);
  };

  if (showDeleteConfirm) {
    return (
      <div className="habit-card delete-confirm">
        <div className="delete-confirm-content">
          <h4>Delete "{habit.name}"?</h4>
          <p>This cannot be undone.</p>
          <div className="confirm-actions">
            <button className="btn-confirm-yes" onClick={confirmDelete}>
              Delete
            </button>
            <button className="btn-confirm-no" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAnimation && <AnimationContainer type={animationType} />}
      {showInfoModal && (
        <HabitInfoModal
          habit={habit}
          streak={streak}
          onClose={() => setShowInfoModal(false)}
        />
      )}
      
      <div
        className={`habit-card ${completed ? 'completed' : ''} ${showAnimation ? 'animating' : ''}`}
        onClick={handleCardClick}
      >
        <div className="habit-card-content">
          <div className="habit-top">
            <h3 className="habit-name">{habit.name}</h3>
            <button
              className="delete-btn"
              onClick={handleDelete}
              title="Delete habit"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="habit-bottom">
            {streak > 0 ? (
              <div className="streak-badge">
                <span className="fire">🔥</span>
                <span className="streak-count">{streak}</span>
              </div>
            ) : (
              <div className="no-streak">Click the card to mark this habit as done for today</div>
            )}
            {completed && <div className="done-badge">✓ Done</div>}
          </div>
        </div>

        <div className={`undo-wrapper ${undoVisible ? 'visible' : ''}`}>
          <button className="undo-btn" onClick={handleUndo} type="button">
            Undo
          </button>
        </div>
      </div>
    </>
  );
}
