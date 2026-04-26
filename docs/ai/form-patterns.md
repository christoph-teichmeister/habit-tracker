# Form Handling Patterns

## Basic Form Component
```javascript
export function MyForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    // Submit
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
          placeholder="Enter name"
          autoFocus
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form State Management
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  category: 'daily'
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

## Validation Pattern
```javascript
function validateForm(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.includes('@')) {
    errors.email = 'Invalid email';
  }

  return errors;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }

  onSubmit(formData);
};
```

## CSS Patterns
```css
.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #45b7d1;
  box-shadow: 0 0 0 3px rgba(69, 183, 209, 0.1);
}

.error {
  color: #c62828;
  font-size: 12px;
  padding: 8px;
  background: #ffebee;
  border-radius: 4px;
}
```

## Best Practices
1. **Use onInput for text fields** — More responsive than onChange
2. **Validate before submit** — Catch errors early
3. **Show errors inline** — Help users fix immediately
4. **Disable submit while loading** — Prevent double-submit
5. **Reset form after success** — Clear for next entry
