import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import '../styles/animations.css';

export function AnimationContainer({ type }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    switch (type) {
      case 'confetti':
        createConfetti(container);
        break;
      case 'bounce-glow':
        createBounceGlow(container);
        break;
      case 'particle-explosion':
        createParticleExplosion(container);
        break;
      case 'rainbow-wave':
        createRainbowWave(container);
        break;
      case 'star-spiral':
        createStarSpiral(container);
        break;
      case 'fireworks':
        createFireworks(container);
        break;
      case 'floating-hearts':
        createFloatingHearts(container);
        break;
    }
  }, [type]);

  return <div ref={containerRef} className="animation-container" />;
}

function createConfetti(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const angle = (Math.PI * 2 * i) / 50;
    const velocity = 4 + Math.random() * 6;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty('--tx', Math.cos(angle) * velocity * 200 + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * velocity * 200 + 'px');
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 4000);
  }
}

function createBounceGlow(container) {
  const glow = document.createElement('div');
  glow.className = 'bounce-glow';
  container.appendChild(glow);
  
  setTimeout(() => glow.remove(), 4000);
}

function createParticleExplosion(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700'];

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (Math.PI * 2 * i) / 40;
    const distance = 100 + Math.random() * 150;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty('--end-x', x + 'px');
    particle.style.setProperty('--end-y', y + 'px');
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 4000);
  }
}

function createRainbowWave(container) {
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'rainbow-wave';
    wave.style.animationDelay = (i * 0.1) + 's';
    container.appendChild(wave);
    
    setTimeout(() => wave.remove(), 4000);
  }
}

function createStarSpiral(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.textContent = '⭐';
    
    const angle = (Math.PI * 2 * i) / 30;
    const distance = 200 + (i * 3);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 200;
    
    star.style.left = centerX + 'px';
    star.style.top = centerY + 'px';
    star.style.setProperty('--end-x', x + 'px');
    star.style.setProperty('--end-y', y + 'px');
    
    container.appendChild(star);
    
    setTimeout(() => star.remove(), 4000);
  }
}

function createFireworks(container) {
  for (let burst = 0; burst < 3; burst++) {
    setTimeout(() => {
      const colors = ['#FF6B6B', '#FFD700', '#4ECDC4', '#FF1744'];
      const x = window.innerWidth * (0.3 + Math.random() * 0.4);
      const y = window.innerHeight * (0.2 + Math.random() * 0.3);

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 150;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--end-y', Math.sin(angle) * distance + 150 + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
      }
    }, burst * 400);
  }
}

function createFloatingHearts(container) {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    
    const x = Math.random() * window.innerWidth;
    const offset = (Math.random() - 0.5) * 100;
    
    heart.style.left = x + 'px';
    heart.style.bottom = '-50px';
    heart.style.setProperty('--offset-x', offset + 'px');
    heart.style.animationDelay = (i * 0.1) + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 4000);
  }
}
