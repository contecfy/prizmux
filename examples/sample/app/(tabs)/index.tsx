
import { FAB } from '@/lib/components/Fab';
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { Filter, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function HomeScreen() {
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Prizmux!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phone Number</Text>
      <PhoneInput
  label="Phone Number"
  defaultCountryCode="UG"
  value={phone}
  onChange={setPhone}
  renderFlag={(country) => (
    <CountryFlag isoCode={country.code} size={22} />
  )}
/>
        {phone?.full && (
          <Text style={styles.result}>Full number: {phone.full}</Text>
        )}
      </View>

    
<PhoneInput
  defaultCountryCode="UG"
  allowedCountries={['UG', 'KE', 'TZ', 'RW', 'BI']}
  onChange={setPhone}
   renderFlag={(country) => (
    <CountryFlag isoCode={country.code} size={22} />
  )}
/>

<PhoneInput
  defaultCountryCode="UG"
  allowedCountries={['UG']}
  onChange={setPhone}
   renderFlag={(country) => (
    <CountryFlag isoCode={country.code} size={22} />
  )}
/>

<PhoneInput
  defaultCountryCode="US"
  onChange={setPhone}
   renderFlag={(country) => (
    <CountryFlag isoCode={country.code} size={22} />
  )}
/>

{/* // Icon only — classic circle FAB */}
<FAB
  icon={<Plus size={24} color="#fff" />}
  onPress={() => {}}
  position="bottom-right"
  borderRadius={16}
  backgroundColor="#166534"
/>
{/* 
// Icon + label — extended FAB */}
{/* <FAB
  icon={<Plus size={20} color="#fff" />}
  label="New Booking"
  labelPosition="right"
  onPress={() => {}}
  position="bottom-right"
  borderRadius={16}
/> */}

{/* // Label only */}
{/* <FAB
  label="Add Item"
  onPress={() => {}}
  position="bottom-center"
  backgroundColor="#166534"
/> */}

{/* // Top left, custom size and color */}
<FAB
  icon={<Filter size={20} color="#fff" />}
  onPress={() => {}}
  position="top-left"
  size="small"
  backgroundColor="#991B1B"
  offsetY={60}
/>
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