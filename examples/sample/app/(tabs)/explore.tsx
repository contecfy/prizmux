import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Phone, Bell, LucideChevronLeft } from 'lucide-react-native';
import { HeaderWithBack } from '@/lib/components/HeaderWithBack';

export default function TabTwoScreen() {
  return (
  


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
