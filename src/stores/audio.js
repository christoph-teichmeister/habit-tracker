import { signal } from '@preact/signals';

export const soundEnabled = signal(false);

// Simple beep sound generation using Web Audio API
export function playSound(type = 'completion') {
  if (!soundEnabled.value) return;

  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    switch (type) {
      case 'completion':
        // Cheerful "ding"
        playTone(audioContext, now, 800, 0.1, 0.2);
        playTone(audioContext, now + 0.1, 1000, 0.1, 0.2);
        break;
      case 'milestone':
        // Fanfare (3-note chord)
        playTone(audioContext, now, 523.25, 0.2, 0.3); // C
        playTone(audioContext, now + 0.05, 659.25, 0.2, 0.3); // E
        playTone(audioContext, now + 0.1, 783.99, 0.2, 0.3); // G
        break;
      case 'undo':
        // Sad "boop"
        playTone(audioContext, now, 400, 0.1, 0.15);
        break;
    }
  } catch (e) {
    console.error('Audio playback failed:', e);
  }
}

function playTone(audioContext, time, frequency, duration, volume = 0.3) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

  osc.start(time);
  osc.stop(time + duration);
}

export function toggleSound() {
  soundEnabled.value = !soundEnabled.value;
  localStorage.setItem('soundEnabled', soundEnabled.value ? 'true' : 'false');
}

export function loadSoundPreference() {
  const pref = localStorage.getItem('soundEnabled');
  if (pref === 'true') soundEnabled.value = true;
}
