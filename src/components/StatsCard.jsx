import { h } from 'preact';
import { habits, completions } from '../stores/habits';
import '../styles/stats-card.css';

export function StatsCard() {
  const habitList = habits.value;
  const completionData = completions.value;

  // Calculate stats
  const totalHabits = habitList.length;
  const totalCompletions = Object.values(completionData).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  const longestStreak = Math.max(...habitList.map(h => {
    // Import getStreak from habits store
    const completions = completionData[h.id] || [];
    if (!completions.length) return 0;
    const sorted = completions
      .map(t => new Date(t).toDateString())
      .sort()
      .reverse();
    let streak = 1;
    const today = new Date();
    let currentDate = new Date(today);
    if (sorted[0] !== currentDate.toDateString()) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (sorted[0] !== currentDate.toDateString()) return 0;
    }
    for (let i = 1; i < sorted.length; i++) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (sorted[i] === currentDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }), 0);

  return (
    <div className="stats-card">
      <div className="stat-item">
        <span className="stat-icon">📊</span>
        <div>
          <span className="stat-label">Total Habits</span>
          <span className="stat-value">{totalHabits}</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">✅</span>
        <div>
          <span className="stat-label">Completions</span>
          <span className="stat-value">{totalCompletions}</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">🔥</span>
        <div>
          <span className="stat-label">Best Streak</span>
          <span className="stat-value">{longestStreak}</span>
        </div>
      </div>
    </div>
  );
}
