import React, { createContext, useContext, useState, useEffect } from 'react';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import 'react-native-reanimated';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// ─── THEME CONTEXT ──────────────────────────────────────

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within a ThemeProvider');
  return context;
}

// ─── ROOT LAYOUT ────────────────────────────────────────

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const nativeColorScheme = useNativeColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(nativeColorScheme ?? 'light');

  const [loaded, error] = useFonts({
    ...MaterialIcons.font,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (mode === 'system') {
      setCurrentTheme(nativeColorScheme ?? 'light');
    } else {
      setCurrentTheme(mode);
    }
  }, [mode, nativeColorScheme]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, mode, setMode }}>
      <ThemeProvider value={currentTheme === 'dark' ? NavDarkTheme : NavDefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="components" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
