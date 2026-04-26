import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import '../styles/confetti.css';

export function Confetti() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const confettiPieces = 50;
    const container = containerRef.current;

    for (let i = 0; i < confettiPieces; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.delay = Math.random() * 0.5 + 's';
      piece.style.backgroundColor = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][
        Math.floor(Math.random() * 5)
      ];
      container.appendChild(piece);
    }
  }, []);

  return <div ref={containerRef} className="confetti-container" />;
}
