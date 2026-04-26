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

    // Much cuter hamster SVG
    const hamsterSVG = `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="mascot-char">
        <!-- Shadow -->
        <ellipse cx="60" cy="108" rx="35" ry="8" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Body -->
        <ellipse cx="60" cy="65" rx="38" ry="42" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        
        <!-- Belly -->
        <ellipse cx="60" cy="72" rx="28" ry="32" fill="#f5deb3" stroke="none"/>
        
        <!-- Head -->
        <circle cx="60" cy="38" r="28" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        
        <!-- Ears -->
        <circle cx="38" cy="12" r="13" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        <circle cx="82" cy="12" r="13" fill="#d4a574" stroke="#8b6914" stroke-width="2"/>
        <circle cx="38" cy="15" r="8" fill="#ffb6c1"/>
        <circle cx="82" cy="15" r="8" fill="#ffb6c1"/>
        
        <!-- Eyes -->
        <circle cx="48" cy="33" r="4" fill="black"/>
        <circle cx="72" cy="33" r="4" fill="black"/>
        <circle cx="50" cy="31" r="1.5" fill="white"/>
        <circle cx="74" cy="31" r="1.5" fill="white"/>
        
        <!-- Nose -->
        <circle cx="60" cy="42" r="3" fill="#8b6914"/>
        
        <!-- Mouth -->
        <path d="M 60 42 Q 55 48 50 46" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 60 42 Q 65 48 70 46" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
        
        <!-- Cheeks (big and round) -->
        <circle cx="22" cy="40" r="14" fill="#ffb6c1" opacity="0.7"/>
        <circle cx="98" cy="40" r="14" fill="#ffb6c1" opacity="0.7"/>
        
        <!-- Front paws -->
        <rect x="40" y="95" width="10" height="15" rx="5" fill="#d4a574" stroke="#8b6914" stroke-width="1"/>
        <rect x="70" y="95" width="10" height="15" rx="5" fill="#d4a574" stroke="#8b6914" stroke-width="1"/>
        <ellipse cx="45" cy="110" rx="6" ry="4" fill="#8b6914"/>
        <ellipse cx="75" cy="110" rx="6" ry="4" fill="#8b6914"/>
        
        <!-- Tail (curved) -->
        <path d="M 95 68 Q 110 60 108 45" stroke="#d4a574" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
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
