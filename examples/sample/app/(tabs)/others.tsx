import { router } from 'expo-router';
import { Alert } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import { FAB } from '@/lib/components/Fab';
import { Header } from '@/lib/components/Header/Header';
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { ContextMenu } from '@/lib/components/ContextMenu/ContextMenu';
import { Bell, BookOpen, Heart, LucideChevronLeft, Menu, Phone, Plus, ShoppingCart, Star, Trash2, User, Users, Wallet, Filter } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function OthersScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [textOnlyAlert, setTextOnlyAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [iconAlert, setIconAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header 
        title='Prizmux ui' 
        showBack={false} 
        backgroundColor={theme.background}
        borderColor={theme.border}
        titleStyle={{ color: theme.text }}
      />
      
      <ScrollView contentContainerStyle={[styles.scroll, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
        {/* Header row with menu trigger */}
        <View style={styles.topBar}>
          <Text style={[styles.title, { color: theme.text }]}>Welcome to Prizmux!</Text>
          <Pressable 
            onPress={() => setSidebarVisible(true)} 
            style={[styles.menuButton, { backgroundColor: theme.card, shadowColor }]}
          >
            <Menu size={24} color={theme.text} />
          </Pressable>
        </View>

        {/* Phone Input */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Phone Input</Text>
          <PhoneInput
            label="Phone number"
            defaultCountryCode="UG"
            value={phone}
            onChange={setPhone}
            placeholder="712 345 678"
            backgroundColor={theme.card}
            borderColor={theme.border}
            textColor={theme.text}
            labelColor={theme.subtext}
            placeholderColor={theme.subtext}
            pickerBackgroundColor={theme.background}
            searchBackgroundColor={theme.card}
            searchBorderColor={theme.border}
            renderFlag={(country) => (
              <CountryFlag isoCode={country.code} size={22} />
            )}
          />
          {phone?.full && (
            <Text style={[styles.result, { color: theme.subtext }]}>Full: {phone.full}</Text>
          )}
        </View>

        {/* Alert triggers */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Alerts</Text>
          <Button 
            title="Text Only" 
            variant="outline" 
            fullWidth 
            onPress={() => setTextOnlyAlert(true)} 
            textColor={theme.text}
            borderColor={theme.text}
          />
          <Button 
            title="Confirm / Destructive" 
            variant="outline" 
            fullWidth 
            onPress={() => setConfirmAlert(true)} 
            textColor={theme.text}
            borderColor={theme.text}
          />
          <Button 
            title="With Icon" 
            variant="outline" 
            fullWidth 
            onPress={() => setIconAlert(true)} 
            textColor={theme.text}
            borderColor={theme.text}
          />
          <Button 
            title="Custom Styled" 
            variant="filled" 
            fullWidth 
            onPress={() => setCustomAlert(true)} 
            backgroundColor={theme.text}
            textColor={theme.background}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <FAB
        icon={<Plus size={24} color={theme.background} />}
        onPress={() => setCustomAlert(true)}
        position="bottom-right"
        backgroundColor={theme.text}
        shadowColor={shadowColor}
      />

      {/* Side Menu (ContextMenu) */}
      <ContextMenu
        visible={sidebarVisible}
        animation='none'
        onClose={() => setSidebarVisible(false)}
        position={{ top: 60, right: 16 }} // anchors it under the menu button
        backgroundColor={theme.card}
        borderRadius={12}
        showIconBackground={true}
        iconBackgroundColor={theme.background}
        iconBorderRadius={8}
        items={[
          {
            id: 'cart',
            title: 'Cart',
            icon: <ShoppingCart size={20} color={theme.text} />,
            badge: 3,
            badgeColor: theme.text,
            onPress: () => console.log('cart'),
          },
          {
            id: 'myorders',
            title: 'My Orders',
            icon: <ShoppingCart size={20} color={theme.text} />,
            onPress: () => console.log('orders'),
          },
          {
            id: 'favourites',
            title: 'Favourites',
            icon: <Heart size={20} color={theme.text} />,
            badge: 5,
            badgeColor: theme.text,
            onPress: () => console.log('favourites'),
          },
          {
            id: 'profile',
            title: 'Profile',
            icon: <User size={20} color={theme.text} />,
            onPress: () => console.log('profile'),
          },
          {
            id: 'workers',
            title: 'Source Skilled Workers',
            icon: <Users size={20} color={theme.text} />,
            onPress: () => console.log('workers'),
          },
          {
            id: 'skilling',
            title: 'Agriculture Skilling',
            icon: <BookOpen size={20} color={theme.text} />,
            onPress: () => console.log('skilling'),
          },
          {
            id: 'loans',
            title: 'Loans',
            icon: <Wallet size={20} color={theme.text} />,
            onPress: () => console.log('loans'),
          },
        ]}
      />

      {/* Alert 1 — text only */}
      <Alert
        visible={textOnlyAlert}
        onClose={() => setTextOnlyAlert(false)}
        title="Maintenance Notice"
        message="The app will be unavailable from 2am to 4am tonight for scheduled maintenance."
        backgroundColor={theme.background}
        titleColor={theme.text}
        messageColor={theme.subtext}
        overlayColor="rgba(0,0,0,0.5)"
      />

      {/* Alert 2 — confirm / destructive */}
      <Alert
        visible={confirmAlert}
        onClose={() => setConfirmAlert(false)}
        title="Delete booking?"
        message="This action cannot be undone. Your booking will be permanently removed."
        backgroundColor={theme.background}
        titleColor={theme.text}
        messageColor={theme.subtext}
        shadowColor={shadowColor}
      >
        <View style={styles.row}>
          <Button 
            title="Cancel" 
            variant="outline" 
            style={styles.flex} 
            onPress={() => setConfirmAlert(false)} 
            textColor={theme.text}
            borderColor={theme.text}
          />
          <Button
            title="Delete"
            variant="filled"
            icon={<Trash2 size={16} color={theme.background} />}
            onPress={() => setConfirmAlert(false)}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
        </View>
      </Alert>

      {/* Alert 3 — icon + stacked buttons */}
      <Alert
        visible={iconAlert}
        onClose={() => setIconAlert(false)}
        title="Rate your experience"
        message="Your feedback helps us improve the service for everyone."
        icon={<Star size={44} color={theme.text} />}
        borderRadius={24}
        backgroundColor={theme.background}
        titleColor={theme.text}
        messageColor={theme.subtext}
        shadowColor={shadowColor}
      >
        <Button 
          title="Rate now" 
          variant="filled" 
          fullWidth 
          onPress={() => setIconAlert(false)} 
          backgroundColor={theme.text}
          textColor={theme.background}
        />
        <Button 
          title="Not now" 
          variant="outline" 
          fullWidth 
          onPress={() => setIconAlert(false)} 
          textColor={theme.text}
          borderColor={theme.text}
        />
      </Alert>

      {/* Alert 4 — fully custom */}
      <Alert
        visible={customAlert}
        onClose={() => setCustomAlert(false)}
        backgroundColor={theme.text} // Invert for "Custom" look
        borderRadius={20}
        overlayColor="rgba(0,0,0,0.75)"
        icon={<Filter size={36} color={theme.background} />}
        message="Your session is about to expire. Would you like to stay signed in?"
        messageColor={theme.background}
        titleColor={theme.background}
        shadowColor={shadowColor}
      >
        <Button
          title="Stay signed in"
          variant="filled"
          fullWidth
          onPress={() => setCustomAlert(false)}
          backgroundColor={theme.background}
          textColor={theme.text}
        />
        <Button
          title="Sign out"
          variant="outline"
          fullWidth
          onPress={() => setCustomAlert(false)}
          textColor={theme.background}
          borderColor={theme.background}
        />
      </Alert>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    fontSize: 13,
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
  },
  sidebarHeaderText: {
    fontSize: 16,
    fontWeight: '700',
  },
});