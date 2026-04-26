import { signal } from '@preact/signals';
import { getStreakCached, invalidateStreakCache } from './streakCache';

// Main habits store
export const habits = signal([]);
export const completions = signal({}); // { habitId: [timestamps...] }

// Load from localStorage
export function loadHabits() {
  try {
    const stored = localStorage.getItem('habits');
    const storedCompletions = localStorage.getItem('completions');
    
    if (stored) habits.value = JSON.parse(stored);
    if (storedCompletions) completions.value = JSON.parse(storedCompletions);
  } catch (e) {
    console.error('Failed to load habits from localStorage:', e);
  }
}

// Save to localStorage
function saveHabits() {
  try {
    localStorage.setItem('habits', JSON.stringify(habits.value));
  } catch (e) {
    console.error('Failed to save habits - localStorage may be full:', e);
  }
}

function saveCompletions() {
  try {
    localStorage.setItem('completions', JSON.stringify(completions.value));
  } catch (e) {
    console.error('Failed to save completions - localStorage may be full:', e);
  }
}

// Add habit with input sanitization
export function addHabit(name, interval) {
  const id = Date.now().toString();
  const sanitizedName = name.trim();
  
  if (!sanitizedName) {
    console.error('Habit name cannot be empty');
    return null;
  }
  
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
export function completeHabit(id) {
  const today = new Date().toDateString();
  const completionTime = new Date().getTime();
  
  if (!completions.value[id]) {
    completions.value = { ...completions.value, [id]: [] };
  }
  
  // Check if already completed today
  const alreadyCompleted = completions.value[id].some(
    timestamp => new Date(timestamp).toDateString() === today
  );
  
  if (!alreadyCompleted) {
    completions.value = {
      ...completions.value,
      [id]: [...completions.value[id], completionTime],
    };
    invalidateStreakCache(id);
    saveCompletions();
    return true;
  }
  
  return false;
}

// Undo last completion
export function undoCompletion(id) {
  if (completions.value[id] && completions.value[id].length > 0) {
    completions.value = {
      ...completions.value,
      [id]: completions.value[id].slice(0, -1),
    };
    invalidateStreakCache(id);
    saveCompletions();
  }
}

// Get completion status for today
export function isCompletedToday(id) {
  if (!completions.value[id]) return false;
  
  const today = new Date().toDateString();
  return completions.value[id].some(
    timestamp => new Date(timestamp).toDateString() === today
  );
}

// Get streak count (cached)
export function getStreak(id) {
  return getStreakCached(id, completions.value);
}

// Get last completion date
export function getLastCompletionDate(id) {
  if (!completions.value[id] || completions.value[id].length === 0) return null;
  
  const sorted = completions.value[id].sort((a, b) => b - a);
  return new Date(sorted[0]);
}

// Format date for display
export function formatLastCompletion(date) {
  if (!date) return 'Never';
  
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const dateStr = date.toDateString();
  
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  
  const daysAgo = Math.floor((Date.now() - date.getTime()) / 86400000);
  return `${daysAgo} days ago`;
}
