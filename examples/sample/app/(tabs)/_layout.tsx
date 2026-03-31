import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '../_layout';

export default function TabLayout() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        tabBarInactiveTintColor: themeColors.subtext,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 20,
          right: 20,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: themeColors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          paddingBottom: 0, // Reset for floating bar
        },
        tabBarItemStyle: {
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="square.grid.2x2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
