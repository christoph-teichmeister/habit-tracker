# Persistent State Pattern

## Overview
Sync Preact Signals with localStorage for simple, effective persistence without a backend.

## Pattern

### Store with Persistence
```javascript
import { signal } from '@preact/signals';

export const items = signal([]);

// Load from localStorage on startup
export function loadItems() {
  try {
    const stored = localStorage.getItem('items');
    if (stored) items.value = JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load:', e);
  }
}

// Save helper
function saveItems() {
  localStorage.setItem('items', JSON.stringify(items.value));
}

// Mutation functions that also save
export function addItem(name) {
  items.value = [...items.value, { id: Date.now(), name }];
  saveItems();
}

export function removeItem(id) {
  items.value = items.value.filter(item => item.id !== id);
  saveItems();
}
```

### App Initialization
```javascript
import { loadItems } from './stores/items';

export function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadItems(); // Load persisted state
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;
  return <ItemList />;
}
```

## Data Structure Best Practices
- Keep JSON serializable (no Date objects, use timestamps)
- Use arrays of objects with unique IDs
- Flatten nested structures when possible

## Size Considerations
- localStorage limit: ~5MB per domain
- For Habit Tracker: ~1KB per 100 habits is typical
- Monitor in DevTools: Application → Storage → Local Storage

## Recovery
```javascript
// Add try-catch and fallback
export function loadItems() {
  try {
    const stored = localStorage.getItem('items');
    if (stored) items.value = JSON.parse(stored);
  } catch (e) {
    console.error('Corrupted localStorage:', e);
    // Optionally: items.value = []; // Reset to empty
  }
}
```

## When to Use
- App settings and preferences
- User-generated content (habits, todos, notes)
- Form drafts

## When NOT to Use
- Authentication tokens (use HttpOnly cookies instead)
- Sensitive user data (consider encrypted storage)
- Large datasets (>1MB — consider IndexedDB)
