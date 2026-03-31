import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/lib/components/Button/Button';
import { Header } from '@/lib/components/Header/Header';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../_layout';

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Header
        title="Prizmux"
        backgroundColor={themeColors.background}
          titleStyle={{
          fontSize: 24,
          fontWeight: '700',
          color: themeColors.text,
        }}
        showBack={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>Welcome</Text>
          <Text style={[styles.tagline, { color: themeColors.subtext }]}>
            A developer-first React Native component system.
          </Text>
        </View>

        <View style={[styles.heroSection, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
          <Text style={[styles.heroText, { color: themeColors.text }]}>
            "You should control your UI — not your UI library."
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Core Features</Text>
          
          <View style={styles.featureList}>
            <View style={[styles.featureItem, { borderBottomColor: themeColors.border }]}>
              <Text style={[styles.featureBullet, { color: themeColors.text }]}>•</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureName, { color: themeColors.text }]}>Centering Engine</Text>
                <Text style={[styles.featureDesc, { color: themeColors.subtext }]}>Pixel-perfect alignment out of the box.</Text>
              </View>
            </View>
            <View style={[styles.featureItem, { borderBottomColor: themeColors.border }]}>
              <Text style={[styles.featureBullet, { color: themeColors.text }]}>•</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureName, { color: themeColors.text }]}>Theme Agnostic</Text>
                <Text style={[styles.featureDesc, { color: themeColors.subtext }]}>Full control over colors and shadows.</Text>
              </View>
            </View>
            <View style={[styles.featureItem, { borderBottomColor: themeColors.border }]}>
              <Text style={[styles.featureBullet, { color: themeColors.text }]}>•</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureName, { color: themeColors.text }]}>Zero Bloat</Text>
                <Text style={[styles.featureDesc, { color: themeColors.subtext }]}>Direct, lightweight, and performant primitives.</Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          title="See Components"
          variant="filled"
          fullWidth
          onPress={() => router.push('/components')}
          backgroundColor={themeColors.text}
          textColor={themeColors.background}
          style={styles.exploreButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    marginTop: 8,
  },
  heroSection: {
    marginHorizontal: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  heroText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  featureList: {
    gap: 0,
  },
  featureItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 16,
  },
  featureBullet: {
    fontSize: 24,
    lineHeight: 28,
  },
  featureContent: {
    flex: 1,
  },
  featureName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  exploreButton: {
    marginHorizontal: 24,
  },
});