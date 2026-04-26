# Modal & Overlay Patterns

## Structure

### Modal Component
```javascript
export function MyModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {/* Modal content */}
      </div>
    </div>
  );
}
```

### CSS
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fade-in 0.2s ease-out;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Parent Component Usage
```javascript
const [showModal, setShowModal] = useState(false);

return (
  <>
    <button onClick={() => setShowModal(true)}>Open Modal</button>
    
    <MyModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      data={selectedData}
    />
  </>
);
```

## Best Practices
1. **Click outside to close** — Add overlay click handler
2. **Stop propagation** — Prevent inner clicks from closing
3. **Accessibility** — Use proper button elements, semantic HTML
4. **Z-index** — Keep modals at 1000+, avoid z-index wars
5. **Animation** — Subtle fade + slide for polish

## Confirmation Pattern
```javascript
export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onConfirm}>Confirm</button>
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
```
