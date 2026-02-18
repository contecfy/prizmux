
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Prizmux!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phone Number</Text>
        <PhoneInput
          label="Enter your phone number"
          defaultCountryCode="UG"
          value={phone}
          onChange={setPhone}
          placeholder="712 345 678"
        />
        {phone?.full && (
          <Text style={styles.result}>Full number: {phone.full}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
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
});