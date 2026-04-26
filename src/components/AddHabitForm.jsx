import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addHabit } from '../stores/habits';
import '../styles/form.css';

export function AddHabitForm({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('daily');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }

    addHabit(name, interval);
    setName('');
    setInterval('daily');
    setShowForm(false);
    onSubmit?.();
  };

  if (!showForm) {
    return (
      <button className="add-habit-btn" onClick={() => setShowForm(true)}>
        + Add Habit
      </button>
    );
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <h2>New Habit</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="habit-name">Habit Name</label>
        <input
          id="habit-name"
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Run, Read"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="habit-interval">Interval</label>
        <select
          id="habit-interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Add Habit
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
