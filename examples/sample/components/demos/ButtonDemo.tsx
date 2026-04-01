import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from '@/lib/components/Button/Button';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function ButtonDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const handlePress = (name: string) => {
    console.log(`${name} pressed`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Variants</Text>
        <View style={styles.row}>
          <Button 
            title="Filled" 
            variant="filled" 
            onPress={() => handlePress('Filled')}
            backgroundColor={themeColors.tint}
            textColor="#FFFFFF"
          />
          <Button 
            title="Outline" 
            variant="outline" 
            onPress={() => handlePress('Outline')}
            borderColor={themeColors.tint}
            textColor={themeColors.tint}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Sizes</Text>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <Button 
            title="Small" 
            size="small" 
            onPress={() => handlePress('Small')}
            backgroundColor={themeColors.tint}
          />
          <Button 
            title="Medium" 
            size="medium" 
            onPress={() => handlePress('Medium')}
            backgroundColor={themeColors.tint}
          />
          <Button 
            title="Large" 
            size="large" 
            onPress={() => handlePress('Large')}
            backgroundColor={themeColors.tint}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>With Icons</Text>
        <View style={styles.column}>
          <Button 
            title="Send Message" 
            icon={<IconSymbol name="paperplane.fill" size={18} color="#FFFFFF" />}
            onPress={() => handlePress('Icon Left')}
            backgroundColor={themeColors.tint}
            fullWidth
          />
          <Button 
            title="Settings" 
            icon={<IconSymbol name="gearshape.fill" size={18} color={themeColors.tint} />}
            iconPosition="right"
            variant="outline"
            onPress={() => handlePress('Icon Right')}
            borderColor={themeColors.tint}
            textColor={themeColors.tint}
            fullWidth
          />
          <View style={styles.row}>
            <Button 
              icon={<IconSymbol name="house.fill" size={20} color="#FFFFFF" />}
              onPress={() => handlePress('Icon Only')}
              backgroundColor={themeColors.tint}
            />
            <Button 
              icon={<IconSymbol name="bolt.fill" size={20} color={themeColors.tint} />}
              variant="outline"
              onPress={() => handlePress('Icon Only Outline')}
              borderColor={themeColors.tint}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>States</Text>
        <View style={styles.row}>
          <Button 
            title="Loading" 
            isLoading 
            onPress={() => {}}
            backgroundColor={themeColors.tint}
          />
          <Button 
            title="Disabled" 
            disabled 
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Shadow & Border</Text>
        <View style={styles.column}>
          <Button 
            title="With Shadow" 
            showShadow
            onPress={() => handlePress('Shadow')}
            backgroundColor={themeColors.card}
            textColor={themeColors.text}
            shadowColor="#000"
          />
          <Button 
            title="Rounded" 
            borderRadius={30}
            onPress={() => handlePress('Rounded')}
            backgroundColor={themeColors.tint}
            fullWidth
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  column: {
    gap: 12,
  },
});
