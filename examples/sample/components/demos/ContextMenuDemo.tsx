import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ContextMenu } from '@/lib/components/ContextMenu/ContextMenu';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function ContextMenuDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [visible, setVisible] = useState(false);

  const menuItems = [
    { 
      id: 'edit', 
      title: 'Edit Post', 
      icon: <IconSymbol name="pencil" size={18} color={themeColors.text} />,
      onPress: () => console.log('Edit pressed') 
    },
    { 
      id: 'share', 
      title: 'Share', 
      icon: <IconSymbol name="square.and.arrow.up" size={18} color={themeColors.text} />,
      onPress: () => console.log('Share pressed'),
      badge: 'New'
    },
    { 
      id: 'delete', 
      title: 'Delete', 
      icon: <IconSymbol name="trash" size={18} color="#EF4444" />,
      onPress: () => console.log('Delete pressed'),
      itemTextColor: '#EF4444'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Context Menus</Text>
        <Text style={[styles.description, { color: themeColors.subtext }]}>
          Floating menus that appear near the interaction point, perfect for secondary actions.
        </Text>
        <Button 
          title="Open Menu" 
          onPress={() => setVisible(true)} 
          backgroundColor={themeColors.tint}
          fullWidth
        />
      </View>

      <ContextMenu
        visible={visible}
        onClose={() => setVisible(false)}
        items={menuItems}
        position={{ top: 220, right: 20 }}
        backgroundColor={themeColors.card}
        itemTextColor={themeColors.text}
        showIconBackground={true}
        iconBackgroundColor={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
      />
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
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
});
