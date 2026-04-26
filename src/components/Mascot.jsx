import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { mascotState, mascotReaction } from '../stores/mascot';
import '../styles/mascot.css';

export function Mascot() {
  const containerRef = useRef(null);
  const currentState = mascotState.value;
  const reaction = mascotReaction.value;

  useEffect(() => {
    if (!containerRef.current) return;

    // Much cuter hamster SVG - expanded viewBox for full ears
    const hamsterSVG = `
      <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" class="mascot-char">
        <!-- Shadow -->
        <ellipse cx="60" cy="128" rx="35" ry="8" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Body -->
        <ellipse cx="60" cy="75" rx="38" ry="42" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        
        <!-- Belly -->
        <ellipse cx="60" cy="82" rx="28" ry="32" fill="#f5deb3" stroke="none"/>
        
        <!-- Head -->
        <circle cx="60" cy="48" r="28" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        
        <!-- Ears -->
        <circle cx="38" cy="18" r="13" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        <circle cx="82" cy="18" r="13" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        <circle cx="38" cy="21" r="8" fill="#ffb6c1"/>
        <circle cx="82" cy="21" r="8" fill="#ffb6c1"/>
        
        <!-- Eyes -->
        <circle cx="48" cy="43" r="4" fill="black"/>
        <circle cx="72" cy="43" r="4" fill="black"/>
        <circle cx="50" cy="41" r="1.5" fill="white"/>
        <circle cx="74" cy="41" r="1.5" fill="white"/>
        
        <!-- Nose -->
        <circle cx="60" cy="52" r="3" fill="#8b6914"/>
        
        <!-- Mouth -->
        <path d="M 60 52 Q 55 58 50 56" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 60 52 Q 65 58 70 56" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
        
        <!-- Cheeks (big and round) -->
        <circle cx="22" cy="50" r="14" fill="#ffb6c1" opacity="0.7"/>
        <circle cx="98" cy="50" r="14" fill="#ffb6c1" opacity="0.7"/>
        
        <!-- Front paws -->
        <rect x="40" y="105" width="10" height="15" rx="5" fill="#d4a574" stroke="#8b6914" stroke-width="1"/>
        <rect x="70" y="105" width="10" height="15" rx="5" fill="#d4a574" stroke="#8b6914" stroke-width="1"/>
        <ellipse cx="45" cy="120" rx="6" ry="4" fill="#8b6914"/>
        <ellipse cx="75" cy="120" rx="6" ry="4" fill="#8b6914"/>
        
        <!-- Tail (curved) -->
        <path d="M 95 78 Q 110 70 108 55" stroke="#d4a574" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    containerRef.current.innerHTML = hamsterSVG;
  }, []);

  return (
    <div className={`mascot ${currentState} ${reaction || ''}`}>
      <div ref={containerRef} className="mascot-container" />
      {reaction && (
        <div className="mascot-reaction-label">
          {reaction === 'completion' && '✨'}
          {reaction === 'milestone-7' && '🎉'}
          {reaction === 'milestone-14' && '🔥'}
          {reaction === 'milestone-30' && '👑'}
          {reaction === 'legend' && '⭐'}
          {reaction === 'proud' && '😊'}
          {reaction === 'sad' && '😔'}
        </div>
      )}
    </div>
  );
}
