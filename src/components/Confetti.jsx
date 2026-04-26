import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import '../styles/confetti.css';

export function Confetti() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create animated particles with SVG
    for (let i = 0; i < 30; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 3 + Math.random() * 4;
      
      circle.setAttribute('cx', centerX);
      circle.setAttribute('cy', centerY);
      circle.setAttribute('r', '4');
      
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
      circle.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
      circle.setAttribute('opacity', '1');
      
      svg.appendChild(circle);
      
      // Animate
      let frame = 0;
      const animate = () => {
        frame++;
        const progress = frame / 60; // 60 frames total
        
        const x = centerX + Math.cos(angle) * velocity * frame * 2;
        const y = centerY + Math.sin(angle) * velocity * frame * 2 - (frame * frame) * 0.15; // gravity
        
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('opacity', Math.max(0, 1 - progress));
        
        if (frame < 60) {
          requestAnimationFrame(animate);
        } else {
          circle.remove();
        }
      };
      
      animate();
    }

    // Add burst circle animation
    const burstCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    burstCircle.setAttribute('cx', centerX);
    burstCircle.setAttribute('cy', centerY);
    burstCircle.setAttribute('r', '0');
    burstCircle.setAttribute('stroke', '#FFD700');
    burstCircle.setAttribute('stroke-width', '3');
    burstCircle.setAttribute('fill', 'none');
    burstCircle.setAttribute('opacity', '0.8');
    svg.appendChild(burstCircle);

    let burstFrame = 0;
    const burstAnimate = () => {
      burstFrame++;
      const maxRadius = 100;
      const radius = (burstFrame / 30) * maxRadius;
      
      burstCircle.setAttribute('r', radius);
      burstCircle.setAttribute('opacity', Math.max(0, 0.8 - burstFrame / 30));
      
      if (burstFrame < 30) {
        requestAnimationFrame(burstAnimate);
      } else {
        burstCircle.remove();
      }
    };

    burstAnimate();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="confetti-svg"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
