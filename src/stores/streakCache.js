// Simple streak cache to avoid recalculation
// Invalidates when completions change

const streakCache = {};

export function getStreakCached(id, completions) {
  // Return cached value if available
  if (streakCache[id] !== undefined) {
    return streakCache[id];
  }

  // Calculate and cache
  const streak = calculateStreak(id, completions);
  streakCache[id] = streak;
  return streak;
}

export function invalidateStreakCache(id) {
  delete streakCache[id];
}

export function clearStreakCache() {
  Object.keys(streakCache).forEach(key => delete streakCache[key]);
}

function calculateStreak(id, completions) {
  if (!completions[id] || completions[id].length === 0) return 0;

  const sorted = completions[id]
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
