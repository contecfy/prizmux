import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LucideChevronRight } from 'lucide-react-native';
import { Header } from '@/lib/components/Header/Header';
import { useAppTheme } from '../_layout';

const COMPONENTS = [
  { id: 'button', name: 'Button', description: 'Interactive button with variants and sizes' },
  { id: 'card', name: 'Card', description: 'Versatile container for content' },
  { id: 'phone-input', name: 'PhoneInput', description: 'International phone number input' },
  { id: 'bottom-sheet', name: 'BottomSheet', description: 'Swipeable interactive sheet' },
  { id: 'image-preview', name: 'ImagePreview', description: 'Full-screen image gallery' },
  { id: 'header', name: 'Header', description: 'Navigation and action bar' },
  { id: 'fab', name: 'FAB', description: 'Floating action button' },
  { id: 'alert', name: 'Alert', description: 'Customizable modal alerts' },
  { id: 'toast', name: 'Toast', description: 'Temporary notification overlays' },
  { id: 'context-menu', name: 'ContextMenu', description: 'Collapsible popup menus' },
  { id: 'empty-state', name: 'EmptyState', description: 'Placeholder for no-data screens' },
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
              onPress={() => router.push(`/components/${comp.id}` as any)}
              style={({ pressed }) => [
                styles.itemRow,
                { borderBottomColor: themeColors.border, opacity: pressed ? 0.6 : 1 }
              ]}
            >
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
