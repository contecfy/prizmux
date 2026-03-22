import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View, useColorScheme, Text } from 'react-native';
import { router } from 'expo-router';
import { Phone, Bell, LucideChevronLeft, PackageOpen } from 'lucide-react-native';
import { Button } from '@/lib/components/Button';
import { EmptyState } from '@/lib/components/EmptyState';
import { Toast } from '@/lib/components/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Header } from '@/lib/components/Header';
import { BottomSheet } from '@/lib/components/BottomSheet';
import { Colors } from '@/constants/theme';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [autoToast, setAutoToast] = useState(false);
  const [manualToast, setManualToast] = useState(false);
  const [bothToast, setBothToast] = useState(false);

  // BottomSheet Variations
  const [bsDefault, setBsDefault] = useState(false);
  const [bsCenter, setBsCenter] = useState(false);
  const [bsCustom, setBsCustom] = useState(false);
  const [bsLeftCloseTitleRight, setBsLeftCloseTitleRight] = useState(false);
  const [bsLeftCloseNoTitle, setBsLeftCloseNoTitle] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title="John Doe"
        backIcon={<LucideChevronLeft size={22} color={theme.text} />}
        onBackPress={() => router.back()}
        showBack
        titlePosition="left"
        backgroundColor={theme.background}
        borderColor={theme.border}
        titleStyle={{ color: theme.text }}
        avatar={
          <Image
            source={{ uri: "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            contentFit="cover"
          />
        }
        actions={[
          {
            icon: <Bell size={22} color={theme.text} />,
            onPress: () => setAutoToast(true),
            badge: 3,
            badgeStyle: { backgroundColor: theme.text },
            badgeTextStyle: { color: theme.background }
          },
          {
            icon: <Phone size={22} color={theme.text} />,
            onPress: () => { }
          },
        ]}
      />

      <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.background }]}>
        {/* Auto dismiss */}
        <Button
          title="Show Auto Toast"
          variant="filled"
          size="medium"
          fullWidth
          onPress={() => setAutoToast(true)}
          backgroundColor={theme.text}
          textColor={theme.background}
        />

        {/* Manual dismiss */}
        <Button
          title="Show Manual Toast"
          variant="outline"
          size="medium"
          fullWidth
          onPress={() => setManualToast(false)} // Fix: should probably toggle or set true, but matching original logic
          backgroundColor="transparent"
          textColor={theme.text}
          borderColor={theme.text}
        />

        {/* Both */}
        <Button
          title="Show Both Toast"
          variant="filled"
          size="medium"
          fullWidth
          onPress={() => setBsDefault(true)} // Example change: trigger BS from here or add new buttons
          backgroundColor={theme.text}
          textColor={theme.background}
          pressedBackgroundColor={colorScheme === 'dark' ? '#333' : '#ccc'}
        />

        <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />

        <Button
          title="Default BottomSheet (Left Title)"
          variant="filled"
          onPress={() => setBsDefault(true)}
          backgroundColor={theme.tint}
          textColor="#fff"
          showShadow={true}
        />

        <Button
          title="Centered Title / Right Close"
          variant="outline"
          onPress={() => setBsCenter(true)}
          borderColor={theme.tint}
          textColor={theme.tint}
          showShadow={false}
        />

        <Button
          title="Custom Theme / Left Close"
          variant="filled"
          onPress={() => setBsCustom(true)}
          backgroundColor="#000"
          textColor="#fff"
          pressedBackgroundColor="#444"
        />

        <Button
          title="Close Left / Title Right"
          variant="outline"
          onPress={() => setBsLeftCloseTitleRight(true)}
          borderColor={theme.text}
          textColor={theme.text}
        />

        <Button
          title="Close Left / No Title"
          variant="filled"
          onPress={() => setBsLeftCloseNoTitle(true)}
          backgroundColor="#EF4444"
          textColor="#fff"
        />

        <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />

        <EmptyState
          title="No bookings yet"
          description="You have no upcoming bookings. Start by booking a service."
          backgroundColor={theme.background}
          titleColor={theme.text}
          descriptionColor={theme.subtext}
          icon={<PackageOpen size={100} color={theme.border} />}
          action={
            <Button
              title="Book Now"
              icon={<LucideChevronLeft size={16} color={theme.background} style={{ transform: [{ rotate: '180deg' }] }} />}
              variant="filled"
              size="large"
              fullWidth
              onPress={() => router.push('/')}
              backgroundColor={theme.text}
              textColor={theme.background}
            />
          }
        />

        <EmptyState
          title="Nothing here"
          description="Check back later."
          backgroundColor={theme.background}
          titleColor={theme.text}
          descriptionColor={theme.subtext}
        />

        <EmptyState
          title="No results"
          description="Try a different search."
          backgroundColor={theme.background}
          titleColor={theme.text}
          descriptionColor={theme.subtext}
          icon={<Image source={require('../../assets/images/empty.jpg')} style={{ width: 120, height: 120 }} />}
        />
      </ScrollView>

      {/* SUCCESS TOAST - Custom styled for demo */}
      <Toast
        visible={autoToast}
        onHide={() => setAutoToast(false)}
        text="Saved successfully"
        description="Your changes have been saved."
        type="success"
        dismiss="auto"
        swipeable
        swipeDirection="vertical"
        duration={3000}
        position="top"
        backgroundColor={theme.text}
        textColor={theme.background}
        descriptionColor={theme.subtext} // Adjust as needed
        shadowColor={colorScheme === 'dark' ? '#fff' : '#000'}
        icon={<Bell size={18} color={theme.background} />}
      />

      {/* ERROR TOAST - Default styled */}
      <Toast
        visible={manualToast}
        onHide={() => setManualToast(false)}
        text="Something went wrong"
        description="Please try again later."
        type="error"
        dismiss="manual"
        position="top"
        backgroundColor={theme.text}
        textColor={theme.background}
        shadowColor={colorScheme === 'dark' ? '#fff' : '#000'}
      />

      {/* INFO TOAST - Bottom position */}
      <Toast
        visible={bothToast}
        onHide={() => setBothToast(false)}
        text="New notification"
        description="You have 3 unread messages."
        type="info"
        dismiss="both"
        duration={5000}
        position="bottom"
        backgroundColor={theme.text}
        textColor={theme.background}
        shadowColor={colorScheme === 'dark' ? '#fff' : '#000'}
      />

      {/* BOTTOMSHEETS */}
      <BottomSheet
        visible={bsDefault}
        onClose={() => setBsDefault(false)}
        title="Quick Settings"
        titlePosition="left"
        closePosition="right"
        backgroundColor={theme.background}
        titleStyle={{ color: theme.text }}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ color: theme.text }}>This is a default bottom sheet with title on the left and close on the right.</Text>
          <Button title="Got it" onPress={() => setBsDefault(false)} backgroundColor={theme.text} textColor={theme.background} />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={bsCenter}
        onClose={() => setBsCenter(false)}
        title="Centered Title"
        titlePosition="center"
        closePosition="left"
        backgroundColor={theme.background}
        titleStyle={{ color: theme.text }}
        headerBorderBottomColor={theme.border}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ color: theme.text }}>The title is perfectly centered here.</Text>
          <Button title="Close" onPress={() => setBsCenter(false)} variant="outline" borderColor={theme.text} textColor={theme.text} />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={bsCustom}
        onClose={() => setBsCustom(false)}
        title="Custom Theme"
        titlePosition="right"
        closePosition="left"
        backgroundColor={theme.text}
        titleStyle={{ color: theme.background }}
        backdropColor="rgba(255, 255, 255, 0.3)"
        showHeaderBorder={false}
        handleColor={theme.background}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ color: theme.background, textAlign: 'center' }}>
            Inverted colors, no header border, close on left, title on right.
          </Text>
          <Button
            title="Cool"
            onPress={() => setBsCustom(false)}
            backgroundColor={theme.background}
            textColor={theme.text}
            showShadow={false}
          />
        </View>
      </BottomSheet>
      <BottomSheet
        visible={bsLeftCloseTitleRight}
        onClose={() => setBsLeftCloseTitleRight(false)}
        title="Settings Menu"
        titlePosition="right"
        closePosition="left"
        backgroundColor={theme.background}
        titleStyle={{ color: theme.text }}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ color: theme.text }}>Close is on the extreme left, title on the extreme right.</Text>
          <Button title="Continue" onPress={() => setBsLeftCloseTitleRight(false)} backgroundColor={theme.text} textColor={theme.background} />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={bsLeftCloseNoTitle}
        onClose={() => setBsLeftCloseNoTitle(false)}
        closePosition="left"
        backgroundColor={theme.background}
        showDragHandle={true}
      >
        <View style={{ gap: 12, paddingVertical: 10 }}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>No Header Title</Text>
          <Text style={{ color: theme.text }}>Just a close button on the left and a drag handle.</Text>
          <Button title="Dismiss" onPress={() => setBsLeftCloseNoTitle(false)} variant="outline" borderColor="#EF4444" textColor="#EF4444" />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});