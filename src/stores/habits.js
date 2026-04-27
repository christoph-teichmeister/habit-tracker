import { signal } from '@preact/signals';
import { invalidateStreakCache } from './streakCache';

export const habits = signal([]);
export const completions = signal({});

// Format date to ISO date string (YYYY-MM-DD) for consistent comparisons
function toDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Load from localStorage
export function loadHabits() {
  try {
    const habitsData = localStorage.getItem('habits');
    const completionsData = localStorage.getItem('completions');

    if (habitsData) {
      habits.value = JSON.parse(habitsData);
    }
    if (completionsData) {
      completions.value = JSON.parse(completionsData);
    }
  } catch (err) {
    console.error('Failed to load habits:', err);
  }
}

// Save to localStorage with error handling
function saveHabits() {
  try {
    localStorage.setItem('habits', JSON.stringify(habits.value));
  } catch (err) {
    console.error('Failed to save habits:', err);
  }
}

function saveCompletions() {
  try {
    localStorage.setItem('completions', JSON.stringify(completions.value));
  } catch (err) {
    console.error('Failed to save completions:', err);
  }
}

// Create new habit
export function createHabit(name, interval = 'daily') {
  const sanitizedName = name.trim();
  if (!sanitizedName) return null;

  const id = `habit-${Date.now()}`;
  const habit = {
    id,
    name: sanitizedName,
    interval,
    createdAt: new Date().toISOString(),
  };

  habits.value = [...habits.value, habit];
  if (!completions.value[id]) {
    completions.value = { ...completions.value, [id]: [] };
  }

  saveHabits();
  saveCompletions();
  return id;
}

// Update habit
export function updateHabit(id, name, interval) {
  const sanitizedName = name.trim();

  habits.value = habits.value.map(h =>
    h.id === id ? { ...h, name: sanitizedName, interval } : h
  );
  saveHabits();
}

// Delete habit
export function deleteHabit(id) {
  habits.value = habits.value.filter(h => h.id !== id);
  const newCompletions = { ...completions.value };
  delete newCompletions[id];
  completions.value = newCompletions;

  invalidateStreakCache(id);
  saveHabits();
  saveCompletions();
}

// Mark habit as completed today
// Stores ONLY the date (YYYY-MM-DD format), NOT the time
export function completeHabit(id) {
  const today = toDateString();

  if (!completions.value[id]) {
    completions.value = { ...completions.value, [id]: [] };
  }

  // Check if already completed today
  const alreadyCompleted = completions.value[id].includes(today);

  if (!alreadyCompleted) {
    completions.value = {
      ...completions.value,
      [id]: [...completions.value[id], today],
    };

    invalidateStreakCache(id);
    saveCompletions();
    return true;
  }

  return false;
}

// Undo last completion
export function undoCompletion(id) {
  if (!completions.value[id] || completions.value[id].length === 0) return false;

  completions.value = {
    ...completions.value,
    [id]: completions.value[id].slice(0, -1),
  };

  invalidateStreakCache(id);
  saveCompletions();
  return true;
}

// Check if completed today
export function isCompletedToday(id) {
  const today = toDateString();
  return completions.value[id]?.includes(today) ?? false;
}

// Get current streak
export function getStreak(id) {
  if (!completions.value[id] || completions.value[id].length === 0) return 0;

  const dates = completions.value[id].sort().reverse();
  let streak = 1;
  const today = toDateString();
  let currentDate = today;

  // Check if last completion is today or yesterday
  if (dates[0] !== currentDate) {
    const yesterday = toDateString(new Date(Date.now() - 86400000));
    if (dates[0] !== yesterday) {
      return 0;
    }
    currentDate = yesterday;
  }

  // Count consecutive days
  for (let i = 1; i < dates.length; i++) {
    const prevDate = toDateString(new Date(new Date(currentDate).getTime() - 86400000));
    if (dates[i] === prevDate) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

// Get last completion date
export function getLastCompletionDate(id) {
  if (!completions.value[id] || completions.value[id].length === 0) return null;

  const dates = completions.value[id].sort().reverse();
  return new Date(dates[0]);
}

// Format date for display
export function formatLastCompletion(date) {
  if (!date) return 'Never';

  const today = toDateString();
  const yesterday = toDateString(new Date(Date.now() - 86400000));
  const dateStr = toDateString(date);

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  const daysAgo = Math.floor((Date.now() - date.getTime()) / 86400000);
  return `${daysAgo} days ago`;
}

// Get all completion dates for a habit
export function getCompletionDates(id) {
  return completions.value[id] || [];
}
