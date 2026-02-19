import { Alert } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import { FAB } from '@/lib/components/Fab';
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { Filter, Plus, Star, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function HomeScreen() {
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();

  const [textOnlyAlert, setTextOnlyAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [iconAlert, setIconAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome to Prizmux!</Text>

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

          <Button
            title="Text Only"
            variant="outline"
            fullWidth
            onPress={() => setTextOnlyAlert(true)}
          />
          <Button
            title="Confirm / Destructive"
            variant="outline"
            fullWidth
            onPress={() => setConfirmAlert(true)}
          />
          <Button
            title="With Icon"
            variant="outline"
            fullWidth
            onPress={() => setIconAlert(true)}
          />
          <Button
            title="Custom Styled"
            variant="filled"
            fullWidth
            onPress={() => setCustomAlert(true)}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <FAB
        icon={<Plus size={24} color="#fff" />}
        onPress={() => setCustomAlert(true)}
        position="bottom-right"
      />

      {/* 1. Text only — no buttons, just dismiss on backdrop tap */}
      <Alert
        visible={textOnlyAlert}
        onClose={() => setTextOnlyAlert(false)}
        title="Maintenance Notice"
        message="The app will be unavailable from 2am to 4am tonight for scheduled maintenance."
      />

      {/* 2. Two buttons side by side */}
      <Alert
        visible={confirmAlert}
        onClose={() => setConfirmAlert(false)}
        title="Delete booking?"
        message="This action cannot be undone. Your booking will be permanently removed."
      >
        <View style={styles.row}>
          <Button
            title="Cancel"
            variant="outline"
            style={styles.flex}
            onPress={() => setConfirmAlert(false)}
          />
          <Button
            title="Delete"
            variant="filled"
           
            icon={<Trash2 size={16} color="#fff" />}
            onPress={() => setConfirmAlert(false)}
          />
        </View>
      </Alert>

      {/* 3. Icon + stacked buttons */}
      <Alert
        visible={iconAlert}
        onClose={() => setIconAlert(false)}
        title="Rate your experience"
        message="Your feedback helps us improve the service for everyone."
        icon={<Star size={44} color="#F59E0B" />}
        borderRadius={24}
      >
        <Button
          title="Rate now"
          variant="filled"
          fullWidth
          onPress={() => setIconAlert(false)}
        />
        <Button
          title="Not now"
          variant="outline"
          fullWidth
          onPress={() => setIconAlert(false)}
        />
      </Alert>

      {/* 4. Fully custom — dark bg, no title, custom colors */}
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
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
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
});