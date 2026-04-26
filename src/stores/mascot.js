import { signal } from '@preact/signals';

export const mascotState = signal('idle'); // idle, celebrating, sad, proud, legend
export const mascotReaction = signal(null); // reaction type for animations

export function setMascotReaction(type, duration = 2000) {
  mascotState.value = 'celebrating';
  mascotReaction.value = type;
  
  setTimeout(() => {
    mascotState.value = 'idle';
    mascotReaction.value = null;
  }, duration);
}

export function celebrateCompletion() {
  setMascotReaction('completion', 2500);
}

export function celebrateStreak(streak) {
  if (streak % 60 === 0) {
    setMascotReaction('legend', 3000);
  } else if (streak % 30 === 0) {
    setMascotReaction('milestone-30', 2500);
  } else if (streak % 14 === 0) {
    setMascotReaction('milestone-14', 2500);
  } else if (streak % 7 === 0) {
    setMascotReaction('milestone-7', 2000);
  }
}

export function showSadReaction() {
  setMascotReaction('sad', 1500);
}

export function showProudReaction() {
  setMascotReaction('proud', 2000);
}
