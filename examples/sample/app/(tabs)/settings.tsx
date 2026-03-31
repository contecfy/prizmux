import React from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/lib/components/Header/Header';
import { useAppTheme } from '../_layout';
import { LucideChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, mode, setMode } = useAppTheme();
  const themeColors = Colors[theme];

  const toggleDarkMode = (isDark: boolean) => {
    setMode(isDark ? 'dark' : 'light');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Header
        title="Settings"
        backgroundColor={themeColors.background}
          titleStyle={{
          fontSize: 24,
          fontWeight: '700',
          color: themeColors.text,
        }}
        showBack={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.subtext }]}>Appearance</Text>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.text }]}>Dark Mode</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleDarkMode}
              trackColor={{ false: themeColors.border, true: themeColors.text }}
            />
          </View>
          <Pressable 
            style={[styles.row, { borderBottomColor: themeColors.border }]}
            onPress={() => setMode('system')}
          >
            <Text style={[styles.rowLabel, { color: themeColors.text }]}>Follow System</Text>
            <View style={styles.rowRight}>
              <Text style={[styles.rowValue, { color: themeColors.subtext }]}>
                {mode === 'system' ? 'On' : 'Off'}
              </Text>
              <LucideChevronRight size={18} color={themeColors.subtext} />
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.subtext }]}>App Info</Text>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.text }]}>Version</Text>
            <Text style={[styles.rowValue, { color: themeColors.subtext }]}>1.4.14</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.text }]}>Developer</Text>
            <Text style={[styles.rowValue, { color: themeColors.subtext }]}>Lukwago Joel Jr</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.subtext }]}>
            Prizmux Example Application. 2026.
          </Text>
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
    paddingTop: 12,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowValue: {
    fontSize: 15,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
});
