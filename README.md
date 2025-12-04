# rn-smooth-ui

A smooth and modern UI component library for React Native.

## Installation

```bash
npm install rn-smooth-ui
# or
yarn add rn-smooth-ui
```

## Usage

```tsx
import { Button, Card } from 'rn-smooth-ui';

function App() {
  return (
    <Card>
      <Button 
        title="Click me" 
        onPress={() => console.log('Pressed')}
        variant="filled"
        size="medium"
      />
    </Card>
  );
}
```

## Components

### Button

A customizable button component with multiple variants, sizes, and states.

**Props:**
- `title` (string, required) - Button text
- `onPress` (function, required) - Press handler
- `variant` ('filled' | 'outline') - Button style variant
- `size` ('small' | 'medium' | 'large') - Button size
- `isLoading` (boolean) - Show loading indicator
- `disabled` (boolean) - Disable button
- `icon` (ReactNode) - Icon component
- `iconPosition` ('left' | 'right') - Icon position
- `fullWidth` (boolean) - Full width button
- `style` (ViewStyle) - Custom button styles
- `textStyle` (TextStyle) - Custom text styles

**Example:**
```tsx
<Button
  title="Submit"
  onPress={handleSubmit}
  variant="filled"
  size="large"
  isLoading={loading}
  fullWidth
/>
```

### Card

A card container component with shadow and rounded corners.

**Props:**
- `children` (ReactNode, required) - Card content
- `style` (ViewStyle) - Custom card styles

**Example:**
```tsx
<Card style={{ margin: 16 }}>
  <Text>Card content</Text>
</Card>
```

## Theme

The library includes a theme system with colors and spacing utilities.

```tsx
import { Colors, spacing } from 'rn-smooth-ui';

// Colors
Colors.light.primary
Colors.light.secondary
// ... etc

// Spacing
spacing.xs
spacing.sm
spacing.md
// ... etc
```

## Development

### Running the Example App

To see all components in action:

```bash
# Install example app dependencies
cd examples/ExampleApp
npm install

# Start the example app
npm start

# Or from root directory
npm run example
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app for physical device

## License

ISC
