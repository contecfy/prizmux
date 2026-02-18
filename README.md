# 👽 Prizmux

A developer-first React Native component system.

> You should control your UI — not your UI library.

Prizmux gives you production-ready UI primitives with no bloated dependencies, no locked abstractions, and no fighting the framework. Just clean components you can copy, modify, and ship.

---

## Why Prizmux?

Most React Native UI libraries are over-opinionated, hard to override, and packed with unnecessary dependencies. Prizmux takes a different approach — lightweight, zero forced dependencies, and fully typed.

Every component follows the same rule: **bring your own icons, images, and navigation**. The package never pulls in lucide, expo-image, expo-router, or any other third-party library on your behalf.

---

## Components

### Button
Variants, sizes, loading state, icon support (left or right), icon-only mode, and full accessibility out of the box.

```tsx
<Button
  title="Continue"
  variant="filled"
  size="medium"
  borderRadius={8}
  icon={<ArrowRight size={18} color="#fff" />}
  iconPosition="right"
  onPress={() => {}}
/>
```

---

### Card
Composable container with shadow and rounded corners. Put anything inside.

```tsx
<Card>
  <Text>Hello world</Text>
</Card>
```

---

### BottomSheet
Swipeable sheet with drag handle, backdrop dismiss, and close button. Bring your own close icon.

```tsx
<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Options"
  closeIcon={<X size={16} color="#333" />}
>
  <Text>Sheet content</Text>
</BottomSheet>
```

---

### ImagePreview
Full screen image viewer with single image and gallery support. Bring your own nav icons.

```tsx
<ImagePreview
  visible={visible}
  images={['https://...']}
  onClose={() => setVisible(false)}
  closeIcon={<X size={24} color="#fff" />}
  prevIcon={<ChevronLeft size={32} color="#fff" />}
  nextIcon={<ChevronRight size={32} color="#fff" />}
/>
```

Trigger it by wrapping any image in a `Pressable`:

```tsx
<Pressable onPress={() => setVisible(true)}>
  <Image source={{ uri: '...' }} style={styles.avatar} />
</Pressable>
```

---

### HeaderWithBack
Navigation header with back button, optional avatar, optional title position, and up to 4 right-side action icons with badge support.

```tsx
<HeaderWithBack
  title="John Doe"
  onBackPress={() => router.back()}
  avatar={<Image source={{ uri: '...' }} style={{ width: 40, height: 40 }} />}
  actions={[
    { icon: <Bell size={22} color="#333" />, onPress: () => {}, badge: 3 },
    { icon: <Phone size={22} color="#333" />, onPress: () => {} },
  ]}
/>
```

---

### EmptyState
Placeholder UI for empty lists or zero-data screens. Bring your own icon and action button.

```tsx
<EmptyState
  title="No bookings yet"
  description="Start by booking a service."
  icon={<CalendarX size={80} color="rgba(99,102,241,0.3)" />}
  action={
    <Button title="Book Now" variant="filled" onPress={() => {}} />
  }
/>
```

---

### PhoneInput
International phone number input with a searchable country picker, auto-detection when a full number is pasted, and a clean ISO code fallback when no flag renderer is provided.

```tsx
<PhoneInput
  label="Phone Number"
  defaultCountryCode="UG"
  value={phone}
  onChange={setPhone}
  placeholder="712 345 678"
  renderFlag={(country) => (
    <CountryFlag isoCode={country.code} size={22} />
  )}
/>
```

`onChange` returns an object with three fields:

```ts
{
  country: Country;   // full country object
  number: string;     // local number only  e.g. "712345678"
  full: string;       // complete number    e.g. "+256712345678"
}
```

**Flags** — no flag library is bundled. Pass any renderer via `renderFlag`, or leave it out and the component falls back to a clean ISO code label (`UG`, `US`).

```bash
# optional — only if you want actual flag images
npm install react-native-country-flag
```

---

## Architecture

```
/components
  /Button
    Button.tsx
    Button.types.ts
    index.ts
  /Card
    Card.tsx
    Card.types.ts
    index.ts
  /BottomSheet
    BottomSheet.tsx
    BottomSheet.types.ts
    index.ts
  /ImagePreview
    ImagePreview.tsx
    ImagePreview.types.ts
    index.ts
  /HeaderWithBack
    HeaderWithBack.tsx
    HeaderWithBack.types.ts
    index.ts
  /EmptyState
    EmptyState.tsx
    EmptyState.types.ts
    index.ts
  /PhoneInput
    PhoneInput.tsx
    PhoneInput.types.ts
    countries.ts
    index.ts
```

---

## Design Decisions

- **No icon library required** — every component that needs an icon accepts `ReactNode`. Pass lucide, react-native-vector-icons, an SVG, or a plain emoji.
- **No navigation dependency** — `HeaderWithBack` requires you to pass `onBackPress`. Use expo-router, react-navigation, or anything else.
- **No image library required** — `ImagePreview` and `HeaderWithBack` accept `ReactNode` for avatar/image slots. Use expo-image, the built-in RN Image, or anything you want.
- **No flag library required** — `PhoneInput` accepts a `renderFlag` prop. Use `react-native-country-flag`, a custom SVG, or rely on the built-in ISO fallback.
- **Fully typed** — every component ships with a `.types.ts` file.