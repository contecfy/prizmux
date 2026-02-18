# 👽 Prizmux

A developer-first React Native component system.

Prizmux gives you production-ready UI primitives that you actually own.
No bloated UI kits. No locked abstractions. No fighting the framework.

Just clean components you can copy, modify, and ship.

---

## Philosophy

Prizmux is built around a simple idea:

> You should control your UI — not your UI library.

Instead of installing a massive dependency that dictates how your app looks and behaves, Prizmux lets you bring components directly into your codebase.

Edit them. Refactor them. Break them. Improve them.

They’re yours.

The system is inspired by modern design-token and system-based approaches, but built specifically for real-world mobile apps.

---

## Why Prizmux?

Most React Native UI libraries are:

* Over-opinionated
* Hard to override
* Packed with unnecessary dependencies
* Designed more for demos than production

Prizmux takes a different approach.

It’s lightweight.
It scales with your system.
It stays out of your way.

You stay in control.

---

## Core Components

* Button (variants, loading states, subtle animation)
* Input (label, validation, secure support)
* Card (composable structure)
* Sheet / Modal (mobile-native UX)
* Toast system
* Theming & design tokens
* Variant system
* Dark mode support
* Fully typed with TypeScript

---

## Architecture

Prizmux follows a system-first structure:

```
/components
  /ui
    button.tsx
    input.tsx
    card.tsx

/lib
  theme.ts
  variants.ts
  cn.ts
```

Every component:

* Reads from centralized design tokens
* Supports variants
* Is safe to edit directly
* Is built for production, not playgrounds

---

## Theming

Design tokens live in one place:

```ts
export const theme = {
  radius: 12,
  spacing: 8,
  colors: {
    primary: "#2563eb",
    background: "#0f172a",
    foreground: "#ffffff",
  },
};
```
