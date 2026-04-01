import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FAB } from '@/lib/components/Fab/FAB';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function FabDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Floating Action Button</Text>
          <Text style={[styles.description, { color: themeColors.subtext }]}>
            FABs represent the primary action in an application. They stick to the screen as you scroll.
          </Text>
          <Text style={[styles.description, { color: themeColors.subtext }]}>
            Observe the FAB appearing in the bottom right corner of this screen.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Sizes & Variants</Text>
          <View style={styles.demoRow}>
            <View style={styles.demoItem}>
              <FAB 
                onPress={() => {}}
                position="top-center" 
                size="small" 
                icon={<IconSymbol name="plus" size={16} color="#FFF" />} 
                backgroundColor={themeColors.tint}
                offsetX={0}
                offsetY={0}
                containerStyle={styles.inlineFab}
              />
              <Text style={[styles.demoLabel, { color: themeColors.subtext }]}>Small</Text>
            </View>
            <View style={styles.demoItem}>
              <FAB 
                onPress={() => {}}
                position="top-center" 
                size="medium" 
                icon={<IconSymbol name="plus" size={20} color="#FFF" />} 
                backgroundColor={themeColors.tint}
                offsetX={0}
                offsetY={0}
                containerStyle={styles.inlineFab}
              />
              <Text style={[styles.demoLabel, { color: themeColors.subtext }]}>Medium</Text>
            </View>
            <View style={styles.demoItem}>
              <FAB 
                onPress={() => {}}
                position="top-center" 
                size="large" 
                icon={<IconSymbol name="plus" size={24} color="#FFF" />} 
                backgroundColor={themeColors.tint}
                offsetX={0}
                offsetY={0}
                containerStyle={styles.inlineFab}
              />
              <Text style={[styles.demoLabel, { color: themeColors.subtext }]}>Large</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Extended FAB</Text>
          <View style={styles.column}>
            <FAB 
              onPress={() => {}}
              position="top-center" 
              label="Add New Task"
              icon={<IconSymbol name="plus" size={20} color="#FFF" />} 
              backgroundColor={themeColors.tint}
              offsetX={0}
              offsetY={0}
              containerStyle={styles.inlineFab}
            />
             <FAB 
              onPress={() => {}}
              position="top-center" 
              label="Search Files"
              icon={<IconSymbol name="magnifyingglass" size={20} color={themeColors.text} />} 
              backgroundColor={themeColors.card}
              labelColor={themeColors.text}
              offsetX={0}
              offsetY={0}
              containerStyle={styles.inlineFab}
              showShadow={true}
              shadowColor={theme === 'dark' ? 'transparent' : '#000'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Actual Floating FAB */}
      <FAB 
        onPress={() => {}} 
        icon={<IconSymbol name="paperplane.fill" size={24} color="#FFF" />} 
        backgroundColor={themeColors.tint}
        position="bottom-right"
        offsetX={20}
        offsetY={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  demoItem: {
    alignItems: 'center',
    gap: 8,
  },
  demoLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  column: {
    gap: 16,
    alignItems: 'flex-start',
  },
  inlineFab: {
    position: 'relative',
    bottom: undefined,
    right: undefined,
    top: undefined,
    left: undefined,
    alignSelf: 'auto',
  },
});
