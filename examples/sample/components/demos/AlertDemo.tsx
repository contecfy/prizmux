import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Alert } from '@/lib/components/Alert/Alert';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function AlertDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [visible, setVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'error',
  });

  const showAlert = (type: 'info' | 'success' | 'error') => {
    const configs = {
      info: { title: 'Information', message: 'This is a standard information alert.', type: 'info' },
      success: { title: 'Success!', message: 'Your changes have been saved successfully.', type: 'success' },
      error: { title: 'Error', message: 'Something went wrong. Please try again.', type: 'error' },
    };
    setAlertConfig(configs[type] as any);
    setVisible(true);
  };

  const getIcon = () => {
    switch (alertConfig.type) {
      case 'success':
        return <IconSymbol name="house.fill" size={40} color="#10B981" />; // Placeholder for check
      case 'error':
        return <IconSymbol name="bell.fill" size={40} color="#EF4444" />; // Placeholder for error
      default:
        return <IconSymbol name="info.circle.fill" size={40} color={themeColors.tint} />;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Predefined Alerts</Text>
        <View style={styles.column}>
          <Button 
            title="Show Info Alert" 
            onPress={() => showAlert('info')} 
            backgroundColor={themeColors.tint}
            fullWidth
          />
          <Button 
            title="Show Success Alert" 
            onPress={() => showAlert('success')} 
            backgroundColor="#10B981"
            fullWidth
          />
          <Button 
            title="Show Error Alert" 
            onPress={() => showAlert('error')} 
            backgroundColor="#EF4444"
            fullWidth
          />
        </View>
      </View>

      <Alert
        visible={visible}
        onClose={() => setVisible(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={getIcon()}
        backgroundColor={themeColors.card}
        titleColor={themeColors.text}
        messageColor={themeColors.subtext}
        shadowColor={theme === 'dark' ? 'transparent' : '#000'}
      >
        <Button 
          title="Understood" 
          onPress={() => setVisible(false)} 
          backgroundColor={themeColors.tint}
          fullWidth
        />
        {alertConfig.type === 'error' && (
           <Button 
            title="Cancel" 
            variant="outline"
            onPress={() => setVisible(false)} 
            borderColor={themeColors.border}
            textColor={themeColors.text}
            fullWidth
          />
        )}
      </Alert>
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
  column: {
    gap: 12,
  },
});
