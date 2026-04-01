import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LucideChevronRight } from 'lucide-react-native';
import { Header } from '@/lib/components/Header/Header';
import { useAppTheme } from '../_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

const COMPONENTS = [
  { id: 'button', name: 'Button', description: 'Interactive button with variants and sizes', icon: 'rectangle.fill' },
  { id: 'card', name: 'Card', description: 'Versatile container for content', icon: 'square.grid.2x2.fill' },
  { id: 'phone-input', name: 'PhoneInput', description: 'International phone number input', icon: 'phone.fill' },
  { id: 'bottom-sheet', name: 'BottomSheet', description: 'Swipeable interactive sheet', icon: 'layers.fill' },
  { id: 'image-preview', name: 'ImagePreview', description: 'Full-screen image gallery', icon: 'cube.fill' },
  { id: 'header', name: 'Header', description: 'Navigation and action bar', icon: 'rectangle.fill' },
  { id: 'fab', name: 'FAB', description: 'Floating action button', icon: 'house.fill' },
  { id: 'alert', name: 'Alert', description: 'Customizable modal alerts', icon: 'bell.fill' },
  { id: 'toast', name: 'Toast', description: 'Temporary notification overlays', icon: 'bubble.left.fill' },
  { id: 'context-menu', name: 'ContextMenu', description: 'Collapsible popup menus', icon: 'cube.fill' },
  { id: 'empty-state', name: 'EmptyState', description: 'Placeholder for no-data screens', icon: 'info.circle.fill' },
];

export default function ComponentsScreen() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Header
        title="Components"
        titleStyle={{
          fontSize: 24,
          fontWeight: '700',
          color: themeColors.text,
        }}
        backgroundColor={themeColors.background}
        showBack={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.list}>
          {COMPONENTS.map((comp) => (
            <Pressable
              key={comp.id}
              onPress={() => router.push(`/componentlist/${comp.id}` as any)}
              style={({ pressed }) => [
                styles.itemRow,
                { borderBottomColor: themeColors.border, opacity: pressed ? 0.6 : 1 }
              ]}
            >
              <View style={styles.iconContainer}>
                <IconSymbol name={comp.icon as any} size={22} color={themeColors.tint} />
              </View>
              <View style={styles.itemContent}>
                <Text style={[styles.itemName, { color: themeColors.text }]}>{comp.name}</Text>
                <Text style={[styles.itemSub, { color: themeColors.subtext }]}>{comp.description}</Text>
              </View>
              <LucideChevronRight size={20} color={themeColors.subtext} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 12,
    paddingBottom: 100,
  },
  list: {
    paddingHorizontal: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemSub: {
    fontSize: 14,
    lineHeight: 20,
  },
});
