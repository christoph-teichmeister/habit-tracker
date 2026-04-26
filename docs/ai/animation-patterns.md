# Animation Patterns

## Container Pattern
Animations live in a separate container component that renders outside the affected component tree (to avoid overflow/clipping).

### Structure
```javascript
// In parent component
{showAnimation && <AnimationContainer type={animationType} />}

// AnimationContainer.jsx
export function AnimationContainer({ type }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    switch (type) {
      case 'animation-name':
        createAnimation(container);
        break;
    }
  }, [type]);

  return <div ref={containerRef} className="animation-container" />;
}
```

## Creating Animations
1. Use `position: fixed` for full-screen overlay
2. Create particles/elements dynamically in JavaScript
3. Apply CSS animations via class names or inline styles
4. Clean up elements after animation completes

### Example: Particle Animation
```javascript
function createConfetti(container) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    // Set CSS custom properties for animation parameters
    particle.style.setProperty('--vx', velocityX);
    particle.style.setProperty('--vy', velocityY);
    container.appendChild(particle);
    // Clean up after animation
    setTimeout(() => particle.remove(), 4000);
  }
}
```

### CSS Animation
```css
@keyframes particle-fall {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(
      calc(var(--vx) * 200px),
      calc(var(--vy) * 200px + 500px)
    );
  }
}

.particle {
  animation: particle-fall 4s ease-out forwards;
}
```

## Duration Guidelines
- Quick feedback: 300-500ms
- Celebration/prominent: 3-4 seconds
- Entrance/exit: 300-600ms

## Performance Tips
- Use `will-change` CSS for expensive animations
- Clean up DOM nodes after animations complete
- Use `transform` and `opacity` for better performance (avoids layout shifts)
- Avoid animating too many elements simultaneously
