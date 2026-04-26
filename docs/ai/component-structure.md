# Component Structure Pattern

## Folder Organization
```
src/
├── components/        # Reusable UI components
├── stores/           # Preact Signals state
├── styles/           # CSS files (one per component)
├── utils/            # Helper functions
└── hooks/            # Custom Preact hooks
```

## Component File Naming
- `ComponentName.jsx` — Main component
- `styles/component-name.css` — Component styles

## Component Template
```javascript
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { myStore } from '../stores/mystore';
import '../styles/my-component.css';

export function MyComponent({ prop1, onCallback }) {
  const [local, setLocal] = useState(false);
  const storeValue = myStore.value;

  useEffect(() => {
    // Setup/cleanup
    return () => {};
  }, []);

  return <div className="my-component">{/* content */}</div>;
}
```

## Best Practices
1. **Props over Context** — Pass props explicitly unless shared across 5+ components
2. **Single Responsibility** — One component = one job
3. **CSS Co-location** — Keep styles next to components
4. **Event Handlers** — Prefix with `handle` (handleClick, handleSubmit)
5. **Derived State** — Calculate in stores, not in components

## Styling
- Use BEM-ish naming: `.component-name`, `.component-name__element`
- Keep media queries with the component
- Use CSS custom properties for theme values
