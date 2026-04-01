import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/lib/components/Header/Header';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '../_layout';
import { useRouter } from 'expo-router';

// Demo Imports
import { ButtonDemo } from '@/components/demos/ButtonDemo';
import { CardDemo } from '@/components/demos/CardDemo';
import { AlertDemo } from '@/components/demos/AlertDemo';
import { ToastDemo } from '@/components/demos/ToastDemo';
import { BottomSheetDemo } from '@/components/demos/BottomSheetDemo';
import { PhoneInputDemo } from '@/components/demos/PhoneInputDemo';
import { ImagePreviewDemo } from '@/components/demos/ImagePreviewDemo';
import { HeaderDemo } from '@/components/demos/HeaderDemo';
import { FabDemo } from '@/components/demos/FabDemo';
import { ContextMenuDemo } from '@/components/demos/ContextMenuDemo';
import { EmptyStateDemo } from '@/components/demos/EmptyStateDemo';

export default function ComponentDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useAppTheme();
  const themeColors = Colors[theme];
  const router = useRouter();

  const renderDemo = () => {
    switch (id) {
      case 'button':
        return <ButtonDemo />;
      case 'card':
        return <CardDemo />;
      case 'alert':
        return <AlertDemo />;
      case 'toast':
        return <ToastDemo />;
      case 'bottom-sheet':
        return <BottomSheetDemo />;
      case 'phone-input':
        return <PhoneInputDemo />;
      case 'image-preview':
        return <ImagePreviewDemo />;
      case 'header':
        return <HeaderDemo />;
      case 'fab':
        return <FabDemo />;
      case 'context-menu':
        return <ContextMenuDemo />;
      case 'empty-state':
        return <EmptyStateDemo />;
      default:
        return (
          <View style={styles.placeholder}>
            <Text style={{ color: themeColors.subtext }}>Demo for "{id}" coming soon...</Text>
          </View>
        );
    }
  };

  const getTitle = () => {
    return id ? (id as string).charAt(0).toUpperCase() + (id as string).slice(1) : 'Component';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Header
        title={getTitle()}
        backgroundColor={themeColors.background}
        titleStyle={{
            fontSize: 20,
            fontWeight: '600',
            color: themeColors.text,
        }}
        showBack={true}
        onBackPress={() => router.back()}
        backIconColor={themeColors.text}
      />
      <View style={[styles.content, { backgroundColor: themeColors.background }]}>
        {renderDemo()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
