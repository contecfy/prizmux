import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PhoneInput } from '@/lib/components/PhoneInput/PhoneInput';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';

export function PhoneInputDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [value, setValue] = useState<{ country: any; number: string; full: string } | undefined>(undefined);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Basic Usage</Text>
        <PhoneInput
          label="Phone Number"
          value={value}
          onChange={setValue}
          placeholder="Enter your phone"
          backgroundColor={themeColors.card}
          textColor={themeColors.text}
          borderColor={themeColors.border}
          pickerBackgroundColor={themeColors.card}
          searchBackgroundColor={themeColors.background}
          searchBorderColor={themeColors.border}
          backdropColor="rgba(0,0,0,0.7)"
          selectedItemBackgroundColor={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
        />
        <View style={styles.resultBox}>
          <Text style={[styles.resultText, { color: themeColors.subtext }]}>
            Full format: <Text style={{ color: themeColors.text, fontWeight: '600' }}>{value?.full || 'N/A'}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>States & Constraints</Text>
        <View style={styles.column}>
          <PhoneInput
            label="Error State"
            error="This phone number is invalid"
            value={undefined}
            onChange={() => {}}
            backgroundColor={themeColors.card}
            textColor={themeColors.text}
            borderColor={themeColors.border}
            pickerBackgroundColor={themeColors.card}
          />
          <PhoneInput
            label="Disabled State"
            disabled
            value={undefined}
            onChange={() => {}}
            backgroundColor={themeColors.card}
            textColor={themeColors.text}
            borderColor={themeColors.border}
            pickerBackgroundColor={themeColors.card}
          />
          <PhoneInput
            label="Restricted Countries (US, GB, UG)"
            allowedCountries={['US', 'GB', 'UG']}
            value={undefined}
            onChange={() => {}}
            backgroundColor={themeColors.card}
            textColor={themeColors.text}
            borderColor={themeColors.border}
            pickerBackgroundColor={themeColors.card}
          />
        </View>
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
  column: {
    gap: 20,
  },
  resultBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  resultText: {
    fontSize: 14,
  },
});
