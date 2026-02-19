import { router } from '@/.expo/types/router';
import { Alert } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import { FAB } from '@/lib/components/Fab';
import { Header } from '@/lib/components/Header/Header';
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { Sidebar } from '@/lib/components/Sidebar';
import { Bell, BookOpen, Filter, Heart, LucideChevronLeft, Menu, Phone, Plus, ShoppingCart, Star, Trash2, User, Users, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [setAutoToast] = useState(false);

  const [textOnlyAlert, setTextOnlyAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [iconAlert, setIconAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
    <Header title='Prizmux ui' showBack backIcon={<LucideChevronLeft size={22} color="#000000" />}  />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header row with menu trigger */}
        <View style={styles.topBar}>
          <Text style={styles.title}>Welcome to Prizmux!</Text>
          <Pressable onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
            <Menu size={24} color="#111827" />
          </Pressable>
        </View>

        {/* Phone Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Phone Input</Text>
          <PhoneInput
            label="Phone number"
            defaultCountryCode="UG"
            value={phone}
            onChange={setPhone}
            placeholder="712 345 678"
            renderFlag={(country) => (
              <CountryFlag isoCode={country.code} size={22} />
            )}
          />
          {phone?.full && (
            <Text style={styles.result}>Full: {phone.full}</Text>
          )}
        </View>

        {/* Alert triggers */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alerts</Text>
          <Button title="Text Only" variant="outline" fullWidth onPress={() => setTextOnlyAlert(true)} />
          <Button title="Confirm / Destructive" variant="outline" fullWidth onPress={() => setConfirmAlert(true)} />
          <Button title="With Icon" variant="outline" fullWidth onPress={() => setIconAlert(true)} />
          <Button title="Custom Styled" variant="filled" fullWidth onPress={() => setCustomAlert(true)} />
        </View>

      </ScrollView>

      {/* FAB */}
      <FAB
        icon={<Plus size={24} color="#fff" />}
        onPress={() => setCustomAlert(true)}
        position="bottom-right"
      />

      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        side="right"
        
        items={[
          {
            id: 'cart',
            title: 'Cart',
            icon: <ShoppingCart size={20} color="#620A32" />,
            badge: 3,
            badgeColor: '#620A32',
            onPress: () => console.log('cart'),
          },
          {
            id: 'myorders',
            title: 'My Orders',
            icon: <ShoppingCart size={20} color="#620A32" />,
            onPress: () => console.log('orders'),
          },
          {
            id: 'favourites',
            title: 'Favourites',
            icon: <Heart size={20} color="#620A32" />,
            badge: 5,
            badgeColor: '#620A32',
            onPress: () => console.log('favourites'),
          },
          {
            id: 'profile',
            title: 'Profile',
            icon: <User size={20} color="#620A32" />,
            onPress: () => console.log('profile'),
          },
          {
            id: 'workers',
            title: 'Source Skilled Workers',
            icon: <Users size={20} color="#620A32" />,
            onPress: () => console.log('workers'),
          },
          {
            id: 'skilling',
            title: 'Agriculture Skilling',
            icon: <BookOpen size={20} color="#620A32" />,
            onPress: () => console.log('skilling'),
          },
          {
            id: 'loans',
            title: 'Loans',
            icon: <Wallet size={20} color="#620A32" />,
            onPress: () => console.log('loans'),
          },
        ]}
        header={
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarHeaderText}>Menu</Text>
          </View>
        }
      />

      {/* Alert 1 — text only */}
      <Alert
        visible={textOnlyAlert}
        onClose={() => setTextOnlyAlert(false)}
        title="Maintenance Notice"
        message="The app will be unavailable from 2am to 4am tonight for scheduled maintenance."
      />

      {/* Alert 2 — confirm / destructive */}
      <Alert
        visible={confirmAlert}
        onClose={() => setConfirmAlert(false)}
        title="Delete booking?"
        message="This action cannot be undone. Your booking will be permanently removed."
      >
        <View style={styles.row}>
          <Button title="Cancel" variant="outline" style={styles.flex} onPress={() => setConfirmAlert(false)} />
          <Button
            title="Delete"
            variant="filled"
           
            icon={<Trash2 size={16} color="#fff" />}
            onPress={() => setConfirmAlert(false)}
          />
        </View>
      </Alert>

      {/* Alert 3 — icon + stacked buttons */}
      <Alert
        visible={iconAlert}
        onClose={() => setIconAlert(false)}
        title="Rate your experience"
        message="Your feedback helps us improve the service for everyone."
        icon={<Star size={44} color="#F59E0B" />}
        borderRadius={24}
      >
        <Button title="Rate now" variant="filled" fullWidth onPress={() => setIconAlert(false)} />
        <Button title="Not now" variant="outline" fullWidth onPress={() => setIconAlert(false)} />
      </Alert>

      {/* Alert 4 — fully custom */}
      <Alert
        visible={customAlert}
        onClose={() => setCustomAlert(false)}
        backgroundColor="#0F172A"
        borderRadius={20}
        overlayColor="rgba(0,0,0,0.75)"
        icon={<Filter size={36} color="#6366F1" />}
        message="Your session is about to expire. Would you like to stay signed in?"
        messageStyle={{ color: '#E2E8F0' }}
      >
        <Button
          title="Stay signed in"
          variant="filled"
          fullWidth
          style={{ backgroundColor: '#6366F1' }}
          onPress={() => setCustomAlert(false)}
        />
        <Button
          title="Sign out"
          variant="outline"
          fullWidth
          style={{ borderColor: '#334155' }}
          textStyle={{ color: '#94A3B8' }}
          onPress={() => setCustomAlert(false)}
        />
      </Alert>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  result: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  sidebarHeader: {
    padding: 16,
    backgroundColor: '#620A32',
  },
  sidebarHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
});