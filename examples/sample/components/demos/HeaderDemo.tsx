import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header } from '@/lib/components/Header/Header';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function HeaderDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Centred Title (Default)</Text>
        <Header 
          title="Centred Header" 
          backgroundColor={themeColors.card}
          titleStyle={{ color: themeColors.text }}
          borderColor={themeColors.border}
          showBack={false}
          style={styles.headerItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Left Aligned & Back</Text>
        <Header 
          title="Inbox" 
          titlePosition="left"
          showBack={true}
          onBackPress={() => {}}
          backgroundColor={themeColors.card}
          titleStyle={{ color: themeColors.text }}
          borderColor={themeColors.border}
          backIconColor={themeColors.text}
          backButtonBackgroundColor={themeColors.background}
          style={styles.headerItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>With Actions & Badges</Text>
        <Header 
          title="Dashboard" 
          backgroundColor={themeColors.card}
          titleStyle={{ color: themeColors.text }}
          borderColor={themeColors.border}
          showBack={false}
          actions={[
            { 
              icon: <IconSymbol name="bell.fill" size={20} color={themeColors.text} />, 
              onPress: () => {},
              badge: 3
            },
            { 
              icon: <IconSymbol name="gearshape.fill" size={20} color={themeColors.text} />, 
              onPress: () => {} 
            }
          ]}
          style={styles.headerItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Custom Avatar</Text>
        <Header 
          title="Profile" 
          titlePosition="left"
          avatar={<View style={[styles.avatar, { backgroundColor: themeColors.tint }]} />}
          backgroundColor={themeColors.card}
          titleStyle={{ color: themeColors.text }}
          borderColor={themeColors.border}
          showBack={false}
          style={styles.headerItem}
        />
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
  headerItem: {
    borderRadius: 12,
    borderWidth: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  }
});
