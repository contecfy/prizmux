import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Phone, Bell, LucideChevronLeft, PackageOpen } from 'lucide-react-native';
import { HeaderWithBack } from '@/lib/components/HeaderWithBack';
import { Button } from '@/lib/components/Button';
import { EmptyState } from '@/lib/components/EmptyState';
import { Toast } from '@/lib/components/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [autoToast, setAutoToast] = useState(false);
  const [manualToast, setManualToast] = useState(false);
  const [bothToast, setBothToast] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithBack
        title="John Doe"
        backIcon={<LucideChevronLeft size={22} color="#000000" />}
        onBackPress={() => router.back()}
        titlePosition="left"
        avatar={
          <Image
            source={{ uri: "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg" }}
            style={{ width: 40, height: 40 }}
            contentFit="cover"
          />
        }
        actions={[
          { icon: <Bell size={22} />, onPress: () => setAutoToast(true), badge: 3 },
          { icon: <Phone size={22} />, onPress: () => {} },
        ]}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Auto dismiss */}
        <Button
          title="Show Auto Toast"
          variant="filled"
          size="medium"
          fullWidth
          onPress={() => setAutoToast(true)}
        />

        {/* Manual dismiss */}
        <Button
          title="Show Manual Toast"
          variant="outline"
          size="medium"
          fullWidth
          onPress={() => setManualToast(true)}
        />

        {/* Both */}
        <Button
          title="Show Both Toast"
          variant="filled"
          size="medium"
          fullWidth
          onPress={() => setBothToast(true)}
        />

        <EmptyState
          title="No bookings yet"
          description="You have no upcoming bookings. Start by booking a service."
          icon={<PackageOpen size={100} color="rgba(98, 10, 50, 0.25)" />}
          action={
            <Button
              title="Book Now"
              icon={<LucideChevronLeft size={16} color="#FFFFFF" style={{ transform: [{ rotate: '180deg' }] }} />}
              variant="filled"
              size="large"
              fullWidth
              onPress={() => router.push('/')}
            />
          }
        />

        <EmptyState
          title="Nothing here"
          description="Check back later."
        />

        <EmptyState
          title="No results"
          description="Try a different search."
          icon={<Image source={require('../../assets/images/empty.jpg')} style={{ width: 120, height: 120 }} />}
        />

      </ScrollView>

      {/* Auto — disappears on its own after 3s */}
        {/* <Toast
          visible={autoToast}
          
          onHide={() => setAutoToast(false)}
          text="Saved successfully"
          description="Your changes have been saved."
          type="success"
          dismiss="manual"
          swipeable
          swipeDirection="vertical"
          duration={3000}
          position="top"
          icon={<Bell size={18} color="#FFFFFF" />}
        /> */}

    <Toast
  visible={autoToast}
          
          onHide={() => setAutoToast(false)}
  text="Custom styled toast"
  description="Totally your own look"
  type="success"
  dismiss="manual"
  position='bottom'
  swipeable
  swipeDirection="horizontal"
  duration={3000}
  icon={<Bell size={18} color="#FFFFFF" />}
  borderRadius={9}
  backgroundColor="#7C3AED"
  textColor="#ffffff"
  descriptionColor="rgba(255,255,255,0.7)"
  style={{ width: 'auto', paddingHorizontal: 24 }}
  textStyle={{ fontSize: 16, fontWeight: '700' }}
  descriptionStyle={{ fontSize: 11 }}
  overlayStyle={{ paddingTop: 80 }}
/>

      {/* Manual — stays until user taps ✕ */}
      <Toast
        visible={manualToast}
        onHide={() => setManualToast(false)}
        text="Something went wrong"
        description="Please try again later."
        type="error"
        dismiss="manual"
        position="top"
      />

      {/* Both — auto-dismisses AND has a close button */}
      <Toast
        visible={bothToast}
        onHide={() => setBothToast(false)}
        text="New notification"
        description="You have 3 unread messages."
        type="info"
        dismiss="both"
        duration={5000}
        position="bottom"
      />

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