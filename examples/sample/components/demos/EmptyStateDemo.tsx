import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { EmptyState } from '@/lib/components/EmptyState/EmptyState';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function EmptyStateDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>No Results</Text>
        <EmptyState
          title="No search results"
          description="We couldn't find anything matching your search. Try different keywords."
          icon={<IconSymbol name="magnifyingglass" size={60} color={themeColors.subtext} />}
          backgroundColor={themeColors.card}
          titleColor={themeColors.text}
          descriptionColor={themeColors.subtext}
          style={styles.emptyStateBox}
          action={
            <Button 
                title="Clear Search" 
                onPress={() => {}} 
                backgroundColor={themeColors.tint}
                fullWidth
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Empty Inbox</Text>
        <EmptyState
          title="Your inbox is empty"
          description="When you receive messages, they will appear here. Start a conversation now!"
          icon={<IconSymbol name="bubble.left.fill" size={60} color={themeColors.tint} />}
          backgroundColor={themeColors.background}
          titleColor={themeColors.text}
          descriptionColor={themeColors.subtext}
          style={styles.emptyStateBox}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyStateBox: {
    borderRadius: 16,
    padding: 40,
  },
});
