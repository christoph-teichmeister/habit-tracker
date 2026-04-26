import { signal } from '@preact/signals';

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
    console.error('Failed to load habits:', e);
  }
}

// Save to localStorage
function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits.value));
}

function saveCompletions() {
  localStorage.setItem('completions', JSON.stringify(completions.value));
}

// Add habit
export function addHabit(name, interval) {
  const id = Date.now().toString();
  const habit = {
    id,
    name,
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
  habits.value = habits.value.map(h =>
    h.id === id ? { ...h, name, interval } : h
  );
  saveHabits();
}

// Delete habit
export function deleteHabit(id) {
  habits.value = habits.value.filter(h => h.id !== id);
  const newCompletions = { ...completions.value };
  delete newCompletions[id];
  completions.value = newCompletions;
  
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
    saveCompletions();
    return true; // Completion was successful, trigger animation
  }
  
  return false; // Already completed today
}

// Undo last completion
export function undoCompletion(id) {
  if (completions.value[id] && completions.value[id].length > 0) {
    completions.value = {
      ...completions.value,
      [id]: completions.value[id].slice(0, -1),
    };
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

// Get streak count
export function getStreak(id) {
  if (!completions.value[id] || completions.value[id].length === 0) return 0;
  
  const sorted = completions.value[id]
    .map(t => new Date(t).toDateString())
    .sort()
    .reverse();
  
  let streak = 1;
  const today = new Date();
  let currentDate = new Date(today);
  
  // Check if last completion is today or yesterday
  if (sorted[0] !== currentDate.toDateString()) {
    currentDate.setDate(currentDate.getDate() - 1);
    if (sorted[0] !== currentDate.toDateString()) {
      return 0;
    }
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
