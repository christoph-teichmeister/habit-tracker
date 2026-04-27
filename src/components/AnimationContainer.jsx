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
        createRainbowPulse(container);
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
      case 'hamster-wheel':
        createHamsterWheel(container);
        break;
      case 'swirl':
        createSwirl(container);
        break;
    }
  }, [type]);

  return <div ref={containerRef} className="animation-container" />;
}

// Unified brand color palette for animations
const BRAND_COLORS = ['#1DD1A1', '#5A4FA8', '#FFD700', '#2ECC71', '#FFA726'];

function createConfetti(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const angle = (Math.PI * 2 * i) / 60;
    const velocity = 5 + Math.random() * 8;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.background = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    particle.style.width = (4 + Math.random() * 8) + 'px';
    particle.style.height = particle.style.width;
    particle.style.setProperty('--vx', Math.cos(angle) * velocity);
    particle.style.setProperty('--vy', Math.sin(angle) * velocity);
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 4000);
  }
}

function createBounceGlow(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let ring = 0; ring < 3; ring++) {
    setTimeout(() => {
      const glow = document.createElement('div');
      glow.className = 'bounce-glow';
      glow.style.left = centerX + 'px';
      glow.style.top = centerY + 'px';
      container.appendChild(glow);
      setTimeout(() => glow.remove(), 4000);
    }, ring * 200);
  }
}

function createParticleExplosion(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (Math.PI * 2 * i) / 50;
    const distance = 150 + Math.random() * 200;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.width = (6 + Math.random() * 10) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    particle.style.setProperty('--end-x', x + 'px');
    particle.style.setProperty('--end-y', y + 'px');
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 4000);
  }
}

function createRainbowPulse(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < 4; i++) {
    const circle = document.createElement('div');
    circle.className = 'rainbow-pulse';
    circle.style.left = centerX + 'px';
    circle.style.top = centerY + 'px';
    circle.style.animationDelay = (i * 0.15) + 's';
    circle.style.borderColor = BRAND_COLORS[i % BRAND_COLORS.length];
    
    container.appendChild(circle);
    setTimeout(() => circle.remove(), 4000);
  }
}

function createStarSpiral(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.textContent = '⭐';
    
    const angle = (Math.PI * 2 * i) / 40;
    const distance = 100 + (i * 4);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 150;
    
    star.style.left = centerX + 'px';
    star.style.top = centerY + 'px';
    star.style.setProperty('--end-x', x + 'px');
    star.style.setProperty('--end-y', y + 'px');
    
    container.appendChild(star);
    setTimeout(() => star.remove(), 4000);
  }
}

function createFireworks(container) {
  for (let burst = 0; burst < 4; burst++) {
    setTimeout(() => {
      const x = window.innerWidth * (0.25 + Math.random() * 0.5);
      const y = window.innerHeight * (0.15 + Math.random() * 0.4);

      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const angle = (Math.PI * 2 * i) / 25;
        const distance = 120 + Math.random() * 180;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = (5 + Math.random() * 7) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--end-y', Math.sin(angle) * distance + 200 + 'px');
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 3500);
      }
    }, burst * 300);
  }
}

function createFloatingHearts(container) {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    
    const x = Math.random() * window.innerWidth;
    const offset = (Math.random() - 0.5) * 150;
    const delay = i * 0.08;
    
    heart.style.left = x + 'px';
    heart.style.bottom = '-50px';
    heart.style.setProperty('--offset-x', offset + 'px');
    heart.style.animationDelay = delay + 's';
    
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000 + delay * 1000);
  }
}

function createHamsterWheel(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const wheel = document.createElement('div');
  wheel.className = 'hamster-wheel';
  wheel.style.left = centerX + 'px';
  wheel.style.top = centerY + 'px';
  wheel.innerHTML = '🐹';
  
  container.appendChild(wheel);
  setTimeout(() => wheel.remove(), 4000);
}

function createSwirl(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.className = 'swirl-particle';
    const angle = (Math.PI * 2 * i) / 40;
    const distance = 50 + (i * 2);
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.width = (4 + Math.random() * 6) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    particle.style.setProperty('--end-x', x + 'px');
    particle.style.setProperty('--end-y', y + 'px');
    particle.style.animationDelay = (i * 0.02) + 's';
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 4000);
  }
}
