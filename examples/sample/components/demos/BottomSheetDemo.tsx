import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BottomSheet from '@/lib/components/BottomSheet/BottomSheet';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';

export function BottomSheetDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<any>({
    title: 'Default Sheet',
    showCloseButton: true,
    closePosition: 'right',
    showDragHandle: true,
    swipeToClose: true,
  });

  const openSheet = (newConfig: any) => {
    setConfig({
      title: undefined,
      showCloseButton: true,
      closePosition: 'right',
      showDragHandle: true,
      swipeToClose: true,
      ...newConfig,
    });
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER VARIATIONS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Header & Titles</Text>
          <View style={styles.column}>
            <Button 
              title="With Centered Title" 
              onPress={() => openSheet({ title: 'Centered Title', titlePosition: 'center' })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
            <Button 
              title="Without Header (Clean)" 
              onPress={() => openSheet({ title: undefined, showCloseButton: false, showDragHandle: true })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
          </View>
        </View>

        {/* CLOSE BUTTON POSITIONS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Close Button Positions</Text>
          <View style={styles.column}>
            <Button 
              title="Close on Left" 
              onPress={() => openSheet({ title: 'Left Close Button', closePosition: 'left', titlePosition: 'right' })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
            <Button 
              title="Close on Right (Default)" 
              onPress={() => openSheet({ title: 'Right Close Button', closePosition: 'right' })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
             <Button 
              title="No Close Button" 
              onPress={() => openSheet({ title: 'Persistent Sheet', showCloseButton: false })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
          </View>
        </View>

        {/* DRAGGING & INTERACTIONS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Dragging & Interaction</Text>
          <View style={styles.column}>
            <Button 
              title="Disable Drag to Close" 
              onPress={() => openSheet({ title: 'Non-Draggable', swipeToClose: false, showDragHandle: false })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
            <Button 
              title="Hide Drag Handle" 
              onPress={() => openSheet({ title: 'No Handle', showDragHandle: false })} 
              backgroundColor={themeColors.tint}
              fullWidth
            />
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        {...config}
        backgroundColor={themeColors.card}
        textColor={themeColors.text}
        handleColor={themeColors.border}
        backdropColor="rgba(0,0,0,0.7)"
        shadowColor={theme === 'dark' ? 'transparent' : '#000'}
        headerBorderBottomColor={themeColors.border}
      >
        <View style={styles.sheetContent}>
          <Text style={[styles.sheetText, { color: themeColors.text }]}>
            This sheet is configured with:
          </Text>
          <View style={[styles.configBox, { backgroundColor: themeColors.background }]}>
             {Object.entries(config).map(([key, val]) => (
                <Text key={key} style={[styles.configText, { color: themeColors.subtext }]}>
                   • {key}: <Text style={{ color: themeColors.tint, fontWeight: '600' }}>{String(val)}</Text>
                </Text>
             ))}
          </View>
          <Button 
            title="Close Sheet" 
            onPress={() => setVisible(false)} 
            variant="outline"
            borderColor={themeColors.border}
            textColor={themeColors.text}
            style={{ marginTop: 20 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
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
  column: {
    gap: 12,
  },
  sheetContent: {
    paddingBottom: 20,
  },
  sheetText: {
    fontSize: 16,
    marginBottom: 16,
  },
  configBox: {
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
  configText: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
});
