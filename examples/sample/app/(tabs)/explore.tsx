import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Phone, Bell, LucideChevronLeft, PackageOpen } from 'lucide-react-native';
import { HeaderWithBack } from '@/lib/components/HeaderWithBack';
import { Button } from '@/lib/components/Button';
import { EmptyState } from '@/lib/components/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (

<SafeAreaView style={{ flex: 1 }}>
<HeaderWithBack
  title="John Doe"
  backIcon={<LucideChevronLeft size={22} color="#000000" />}
  onBackPress={() => router.back()}
  titlePosition="left"
  avatar={
    <Image
      source={{ uri:  "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg" }}
      style={{ width: 40, height: 40 }}
      contentFit="cover"
    />
  }
  actions={[
    { icon: <Bell size={22} />, onPress: () => {}, badge: 3 },
    { icon: <Phone size={22} />, onPress: () => {} },
  ]}
/>

<ScrollView>

<EmptyState
  title="No bookings yet"
  description="You have no upcoming bookings. Start by booking a service."
  icon={<PackageOpen size={100} color="rgba(98, 10, 50, 0.25)" />}
  action={
    <Button
      title="Book Now"
      variant="filled"
      size="large"
      fullWidth
      onPress={() => router.push('/')}
    />
  }
/>

// With just text — no icon, no button
<EmptyState
  title="Nothing here"
  description="Check back later."
/>

// With a custom image instead of an icon
<EmptyState
  title="No results"
  description="Try a different search."
  icon={<Image source={require('../../assets/images/empty.jpg')} style={{ width: 120, height: 120 }} />}
/>
</ScrollView>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
