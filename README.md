# Prismaui

A modern, developer-first React Native component system built for flexibility, customization, and real-world mobile apps.

Prismaui provides clean, production-ready UI primitives that you fully own — no heavy UI kits, no locked abstractions, no unnecessary bloat.

---

## ✨ Philosophy

Prismaui is built around one core idea:

> Developers should own their UI.

Instead of installing a massive UI framework, Prismaui allows you to copy components directly into your project. You can modify, extend, and adapt them without fighting the library.

Inspired by modern system-based design approaches, Prismaui focuses on:

- 🎯 Mobile-first components
- 🎨 Strong design tokens
- 🌙 Built-in dark mode support
- ⚡ Smooth interactions & animations
- 🧱 Clean, composable primitives
- 🧠 Production-ready patterns

---

## 🚀 Why Prismaui?

Most React Native UI libraries are:

- Too opinionated
- Hard to customize
- Heavy with dependencies
- Styled in ways that are difficult to override

Prismaui is different.

- Lightweight
- Minimal dependencies
- Built for real production apps
- Designed to scale with your system

You control the components.
Not the other way around.

---

## 📦 Core Features

- Button (variants, loading, animation)
- Input (label, error, secure support)
- Card (composable structure)
- Sheet / Modal (mobile-native UX)
- Toast system
- Theming & design tokens
- Variant system
- Dark mode ready
- Fully typed with TypeScript

---

## 🧱 Architecture

Prismaui follows a system-first structure:

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

- Reads from design tokens
- Supports variants
- Is fully customizable
- Is safe to edit directly

---

## 🎨 Theming

Prismaui uses centralized design tokens:

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
