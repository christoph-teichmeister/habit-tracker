# CLAUDE.md — AI Agent Development Guide

This document references architecture patterns and structures that AI agents should follow when working on this project.

## Core Patterns

### State Management
📄 **[docs/ai/state-management.md](docs/ai/state-management.md)**
- Use Preact Signals for lightweight reactivity
- Store-based state shared across components
- Signal subscription patterns

### Component Structure
📄 **[docs/ai/component-structure.md](docs/ai/component-structure.md)**
- Folder organization and naming conventions
- Component template structure
- Props vs. Context decisions
- CSS co-location

### Persistent State
📄 **[docs/ai/persistent-state.md](docs/ai/persistent-state.md)**
- localStorage sync patterns
- Initialization on app startup
- Error recovery and data validation
- Size and storage considerations

### Animations
📄 **[docs/ai/animation-patterns.md](docs/ai/animation-patterns.md)**
- Animation container pattern (separate from affected components)
- CSS + JavaScript animation combination
- Particle and effect generation
- Performance optimization

### Modals & Overlays
📄 **[docs/ai/modal-patterns.md](docs/ai/modal-patterns.md)**
- Modal component structure
- Overlay interactions (click outside to close)
- Confirmation dialog pattern
- Z-index management

### Forms
📄 **[docs/ai/form-patterns.md](docs/ai/form-patterns.md)**
- Form component template
- State management for forms
- Validation patterns
- Error display and handling

## Project Structure

```
src/
├── components/          # Reusable UI components
├── stores/             # Preact Signals state
├── styles/             # Component CSS files
├── utils/              # Helper functions
└── hooks/              # Custom Preact hooks

docs/
└── ai/                 # This documentation
    ├── state-management.md
    ├── component-structure.md
    ├── persistent-state.md
    ├── animation-patterns.md
    ├── modal-patterns.md
    └── form-patterns.md
```

## Tech Stack

- **UI Framework**: Preact (lightweight React alternative)
- **State**: Preact Signals (reactive primitives)
- **Styling**: CSS (no CSS-in-JS)
- **Build**: Vite
- **Deployment**: GitHub Pages
- **PWA**: Service Worker + Manifest

## Key Principles

1. **Lightweight First** — Preact over React, Signals over Redux
2. **Local Storage** — No backend, data persists on device
3. **Minimal Dependencies** — Keep bundle small
4. **Component Reusability** — Extract shared patterns
5. **Accessibility** — Semantic HTML, ARIA where needed
6. **Mobile-First** — Design for small screens first
7. **Polish Details** — Animations, transitions, error states

## Before Making Changes

1. **Read the relevant pattern doc** — Understand the established approach
2. **Follow naming conventions** — Consistency matters
3. **Keep files small** — Single responsibility per component
4. **Test locally** — Run `npm run dev` before pushing
5. **Check the build** — Run `npm run build` to catch errors

## Questions?

If a pattern isn't documented, create a new file in `docs/ai/` and reference it here.

---

**Last Updated**: April 2026  
**Status**: Active Development
