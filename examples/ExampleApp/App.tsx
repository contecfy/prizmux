import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Card } from 'prizmux';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Prizmux</Text>
        <Text style={styles.subtitle}>Component Showcase</Text>

        {/* Button Variants */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Button Variants</Text>
          
          <View style={styles.buttonGroup}>
            <Button
              title="Filled Button"
              onPress={handlePress}
              variant="filled"
              size="medium"
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Outline Button"
              onPress={handlePress}
              variant="outline"
              size="medium"
            />
          </View>
        </Card>

        {/* Button Sizes */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Button Sizes</Text>
          
          <View style={styles.buttonGroup}>
            <Button
              title="Small Button"
              onPress={handlePress}
              variant="filled"
              size="small"
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Medium Button"
              onPress={handlePress}
              variant="filled"
              size="medium"
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Large Button"
              onPress={handlePress}
              variant="filled"
              size="large"
            />
          </View>
        </Card>

        {/* Button States */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Button States</Text>
          
          <View style={styles.buttonGroup}>
            <Button
              title="Loading Button"
              onPress={handlePress}
              variant="filled"
              isLoading={loading}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Disabled Button"
              onPress={handlePress}
              variant="filled"
              disabled={true}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Disabled Outline"
              onPress={handlePress}
              variant="outline"
              disabled={true}
            />
          </View>
        </Card>

        {/* Full Width Button */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Full Width Button</Text>
          <Button
            title="Full Width Button"
            onPress={handlePress}
            variant="filled"
            fullWidth={true}
          />
        </Card>

        {/* Card Examples */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Card Component</Text>
          <Text style={styles.description}>
            This is a card component with shadow and rounded corners.
            You can put any content inside it.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Another Card</Text>
          <Text style={styles.description}>
            Cards are great for grouping related content together.
          </Text>
          <View style={styles.buttonGroup}>
            <Button
              title="Action Button"
              onPress={handlePress}
              variant="outline"
              size="small"
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  buttonGroup: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

