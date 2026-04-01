import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Toast } from '@/lib/components/Toast/Toast';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function ToastDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [visible, setVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState<any>({
    text: 'Hello World',
    description: '',
    position: 'top',
    dismiss: 'auto',
    swipeable: false,
    type: 'info',
  });

  const showToast = (config: any) => {
    setToastConfig({
      ...toastConfig,
      ...config,
    });
    setVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* POSITIONING */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Positioning</Text>
        <View style={styles.row}>
          <Button 
            title="Top Position" 
            onPress={() => showToast({ position: 'top', text: 'Appeared at the TOP' })} 
            backgroundColor={themeColors.tint}
          />
          <Button 
            title="Bottom Position" 
            onPress={() => showToast({ position: 'bottom', text: 'Appeared at the BOTTOM' })} 
            backgroundColor={themeColors.tint}
          />
        </View>
      </View>

      {/* DISMISSAL & SWIPING */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Dismissal & Interactions</Text>
        <View style={styles.column}>
          <Button 
            title="Manual Dismiss (X Button)" 
            onPress={() => showToast({ dismiss: 'manual', text: 'Tap the X to close me', duration: 10000 })} 
            backgroundColor={themeColors.tint}
            fullWidth
          />
          <Button 
            title="Swipe to Dismiss (Left/Right)" 
            onPress={() => showToast({ 
                swipeable: true, 
                swipeDirection: 'horizontal', 
                dismiss: 'manual',
                text: 'Swipe me left or right to dismiss' 
            })} 
            backgroundColor={themeColors.tint}
            fullWidth
          />
        </View>
      </View>

      {/* RICH CONTENT */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Rich Content</Text>
        <View style={styles.column}>
          <Button 
            title="With Icon" 
            onPress={() => showToast({ 
                text: 'File Uploaded', 
                icon: <IconSymbol name="plus" size={20} color="#FFF" />,
                backgroundColor: '#10B981'
            })} 
            backgroundColor="#10B981"
            fullWidth
          />
          <Button 
            title="Title & Description" 
            onPress={() => showToast({ 
                text: 'Security Alert', 
                description: 'A new device has logged into your account from Kampala, Uganda.',
                icon: <IconSymbol name="bell.fill" size={20} color="#FFF" />,
                backgroundColor: '#EF4444',
                dismiss: 'both'
            })} 
            backgroundColor="#EF4444"
            fullWidth
          />
        </View>
      </View>

      {/* CUSTOM COLORS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Theming & Custom Colors</Text>
        <View style={styles.column}>
          <Button 
            title="Custom Premium (Violet)" 
            onPress={() => showToast({ 
                text: 'Premium Feature', 
                description: 'Upgrade now to unlock more components.',
                backgroundColor: '#8B5CF6',
                textColor: '#FFF',
                icon: <IconSymbol name="bolt.fill" size={20} color="#FFF" />
            })} 
            backgroundColor="#8B5CF6"
            fullWidth
          />
          <Button 
            title="Glass Effect Style" 
            onPress={() => showToast({ 
                text: 'System Notification', 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.8)',
                textColor: theme === 'dark' ? '#FFF' : '#FFF',
                icon: <IconSymbol name="info.circle.fill" size={20} color="#FFF" />
            })} 
            backgroundColor={themeColors.text}
            fullWidth
          />
        </View>
      </View>

      <Toast
        visible={visible}
        onHide={() => setVisible(false)}
        {...toastConfig}
        shadowColor={theme === 'dark' ? 'transparent' : '#000'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  column: {
    gap: 12,
  },
});
