import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import lottie from 'lottie-web';
import { mascotState, mascotReaction } from '../stores/mascot';
import '../styles/mascot.css';

export function Mascot() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const currentState = mascotState.value;
  const reaction = mascotReaction.value;

  useEffect(() => {
    if (!containerRef.current) return;

    // Load hamster character SVG (placeholder, would be Lottie JSON in production)
    const hamsterSVG = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="mascot-char">
        <!-- Hamster body -->
        <circle cx="50" cy="60" r="35" fill="#f4a460" stroke="#8b6914" stroke-width="2"/>
        <!-- Head -->
        <circle cx="50" cy="35" r="25" fill="#f4a460" stroke="#8b6914" stroke-width="2"/>
        <!-- Ears -->
        <circle cx="35" cy="15" r="10" fill="#f4a460" stroke="#8b6914" stroke-width="1"/>
        <circle cx="65" cy="15" r="10" fill="#f4a460" stroke="#8b6914" stroke-width="1"/>
        <circle cx="35" cy="18" r="6" fill="#ffb6c1"/>
        <circle cx="65" cy="18" r="6" fill="#ffb6c1"/>
        <!-- Eyes -->
        <circle cx="42" cy="30" r="3" fill="black"/>
        <circle cx="58" cy="30" r="3" fill="black"/>
        <!-- Mouth -->
        <path d="M 50 38 Q 48 42 50 43 Q 52 42 50 38" fill="black"/>
        <!-- Cheeks (puffed for celebration) -->
        <circle cx="25" cy="38" r="12" fill="#ffb6c1" opacity="0.6"/>
        <circle cx="75" cy="38" r="12" fill="#ffb6c1" opacity="0.6"/>
        <!-- Paws -->
        <rect x="35" y="85" width="8" height="12" rx="4" fill="#f4a460" stroke="#8b6914" stroke-width="1"/>
        <rect x="57" y="85" width="8" height="12" rx="4" fill="#f4a460" stroke="#8b6914" stroke-width="1"/>
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
