import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Card } from '@/lib/components/Card/Card';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';

export function CardDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Basic Cards</Text>
        <Card backgroundColor={themeColors.card} shadowColor={theme === 'dark' ? 'transparent' : '#000'}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Simple Card</Text>
          <Text style={[styles.cardText, { color: themeColors.subtext }]}>
            This is a basic card with default padding and elevation.
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Custom Styling</Text>
        <Card 
          backgroundColor={themeColors.tint} 
          borderRadius={24}
          style={{ padding: 24 }}
        >
          <Text style={[styles.cardTitle, { color: '#FFF' }]}>Rounded & Colored</Text>
          <Text style={[styles.cardText, { color: 'rgba(255,255,255,0.8)' }]}>
            You can override border radius and background color easily.
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>With Content</Text>
        <Card 
           backgroundColor={themeColors.card} 
           style={{ padding: 0, overflow: 'hidden' }}
           shadowColor={theme === 'dark' ? 'transparent' : '#000'}
        >
          <View style={[styles.imagePlaceholder, { backgroundColor: themeColors.border }]} />
          <View style={{ padding: 16 }}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>Article Card</Text>
            <Text style={[styles.cardText, { color: themeColors.subtext }]}>
              Cards are great containers for complex content like images and buttons.
            </Text>
            <View style={styles.footer}>
              <Button 
                title="Read More" 
                size="small" 
                variant="filled" 
                onPress={() => {}} 
                backgroundColor={themeColors.tint}
              />
            </View>
          </View>
        </Card>
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
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  imagePlaceholder: {
    height: 150,
    width: '100%',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
