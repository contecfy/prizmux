# Quick Start Guide

## 🚀 Running the Example App

The example app showcases all the components in `rn-smooth-ui`. Here's how to run it:

### Step 1: Install Example App Dependencies

```bash
cd examples/ExampleApp
npm install
```

This will install Expo and all required dependencies.

### Step 2: Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

### Step 3: Choose Your Platform

Once the server starts, you can:

- **Press `i`** - Open in iOS Simulator (requires Xcode on macOS)
- **Press `a`** - Open in Android Emulator (requires Android Studio)
- **Press `w`** - Open in Web Browser (works everywhere!)
- **Scan QR Code** - Open with Expo Go app on your phone

### Alternative: Run from Root Directory

You can also run from the project root:

```bash
# From project root
npm run example        # Start Expo dev server
npm run example:ios    # Start on iOS
npm run example:android # Start on Android  
npm run example:web    # Start on Web
```

## 📱 What You'll See

The example app includes:

- ✅ Button variants (filled, outline)
- ✅ Button sizes (small, medium, large)
- ✅ Button states (loading, disabled)
- ✅ Full width buttons
- ✅ Card components
- ✅ Interactive examples

## 🔧 Requirements

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **For iOS**: Xcode (macOS only)
- **For Android**: Android Studio with Android SDK
- **For Physical Device**: Expo Go app from App Store/Play Store

## 🐛 Troubleshooting

### Module Resolution Errors

If you see import errors:

1. Make sure you're in the `examples/ExampleApp` directory
2. Run `npm install` again
3. Clear cache: `npm start -- --clear`

### Port Already in Use

If port 8081 is already in use:

```bash
npm start -- --port 8082
```

### Clear Metro Cache

```bash
npm start -- --clear
```

## 📝 Next Steps

After running the example app:

1. Explore the components in `src/components/`
2. Check out the example usage in `examples/ExampleApp/App.tsx`
3. Modify components and see changes in real-time!

