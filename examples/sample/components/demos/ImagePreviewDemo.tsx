import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { ImagePreview } from '@/lib/components/ImagePreview/ImagePreview';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/app/_layout';

const SAMPLE_IMAGES = [
  'https://images.pexels.com/photos/28125220/pexels-photo-28125220.jpeg',
  'https://images.pexels.com/photos/28125220/pexels-photo-28125220.jpeg',
  'https://lukwagojr.vercel.app/me.jpg',
];

export function ImagePreviewDemo() {
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];

  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openGallery = (index: number) => {
    setInitialIndex(index);
    setVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Gallery Grid</Text>
        <Text style={[styles.description, { color: themeColors.subtext }]}>
          Tap any image to open the full-screen immersive preview.
        </Text>
        <View style={styles.grid}>
          {SAMPLE_IMAGES.map((uri, index) => (
            <Pressable 
              key={index} 
              onPress={() => openGallery(index)}
              style={styles.gridItem}
            >
              <Image source={{ uri }} style={styles.gridImage} />
            </Pressable>
          ))}
        </View>
      </View>

      <ImagePreview
        visible={visible}
        images={SAMPLE_IMAGES}
        initialIndex={initialIndex}
        onClose={() => setVisible(false)}
        title="Nature Collection"
        backgroundColor={theme === 'dark' ? '#000' : 'rgba(0,0,0,0.9)'}
        textColor="#FFFFFF"
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
