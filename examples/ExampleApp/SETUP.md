# Quick Setup Guide

## First Time Setup

1. **Install dependencies for the example app:**
   ```bash
   cd examples/ExampleApp
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Choose how to run:**
   - Press `i` to open iOS simulator (requires Xcode on macOS)
   - Press `a` to open Android emulator (requires Android Studio)
   - Press `w` to open in web browser
   - Scan QR code with Expo Go app on your phone

## Alternative: Run from Root Directory

From the project root:
```bash
npm run example        # Start Expo dev server
npm run example:ios    # Start on iOS
npm run example:android # Start on Android
npm run example:web    # Start on Web
```

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- For iOS: Xcode (macOS only)
- For Android: Android Studio with Android SDK
- For physical device: Expo Go app from App Store/Play Store

## Troubleshooting

If you get module resolution errors:
1. Make sure you're in the `examples/ExampleApp` directory
2. Run `npm install` again
3. Clear cache: `npm start -- --clear`
