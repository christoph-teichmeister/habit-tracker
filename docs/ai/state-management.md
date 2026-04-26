# State Management Pattern

## Overview
Use Preact Signals for lightweight, reactive state management without the overhead of Context or Redux.

## Pattern

### Store Structure
```javascript
import { signal } from '@preact/signals';

// Define state
export const myState = signal(initialValue);

// Helper functions for state mutations
export function updateState(newValue) {
  myState.value = newValue;
}

// Computed/derived state
export function getDerivedValue() {
  // Calculate from myState.value
}
```

### In Components
```javascript
import { myState } from '../stores/mystore';

export function MyComponent() {
  const value = myState.value;
  
  // Component automatically re-renders on signal changes
  return <div>{value}</div>;
}
```

## Benefits
- Minimal bundle size
- No prop drilling
- Automatic reactivity
- Easy to debug

## When to Use
- App-level state (habits, completions, etc.)
- Persistent state (localStorage backed)
- Shared state across many components

## When NOT to Use
- Local component state (use useState instead)
- Complex state trees (consider breaking into multiple signals)
