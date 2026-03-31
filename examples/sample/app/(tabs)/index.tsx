
import { FAB } from '@/lib/components/Fab';
import { PhoneInput, PhoneInputValue } from '@/lib/components/PhoneInput';
import { Plus, Filter } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();

  return (

    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to Prizmux!</Text>

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, shadowColor: colorScheme === 'dark' ? '#fff' : '#000' }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Phone Number</Text>
        <PhoneInput
          label="Phone Number"
          defaultCountryCode="UG"
          value={phone}
          onChange={setPhone}
          backgroundColor={theme.card}
          borderColor={theme.border}
          textColor={theme.text}
          labelColor={theme.subtext}
          pickerBackgroundColor={theme.background}
          searchBackgroundColor={theme.card}
          searchBorderColor={theme.border}
          placeholderColor={theme.subtext}
          renderFlag={(country) => (
            <CountryFlag isoCode={country.code} size={22} />
          )}
        />
        {phone?.full && (
          <Text style={[styles.result, { color: theme.subtext }]}>Full number: {phone.full}</Text>
        )}
      </View>

      <View style={{ gap: 10, marginTop: 20 }}>
        <PhoneInput
          defaultCountryCode="UG"
          allowedCountries={['UG', 'KE', 'TZ', 'RW', 'BI']}
          onChange={setPhone}
          backgroundColor={theme.card}
          borderColor={theme.border}
          textColor={theme.text}
          labelColor={theme.subtext}
          pickerBackgroundColor={theme.background}
          searchBackgroundColor={theme.card}
          searchBorderColor={theme.border}
          placeholderColor={theme.subtext}
          renderFlag={(country) => (
            <CountryFlag isoCode={country.code} size={22} />
          )}
        />

        <PhoneInput
          defaultCountryCode="UG"
          allowedCountries={['UG']}
          onChange={setPhone}
          backgroundColor={theme.card}
          borderColor={theme.border}
          textColor={theme.text}
          labelColor={theme.subtext}
          pickerBackgroundColor={theme.background}
          searchBackgroundColor={theme.card}
          searchBorderColor={theme.border}
          placeholderColor={theme.subtext}
          renderFlag={(country) => (
            <CountryFlag isoCode={country.code} size={22} />
          )}
        />

        <PhoneInput
          defaultCountryCode="US"
          onChange={setPhone}
          backgroundColor={theme.card}
          borderColor={theme.border}
          textColor={theme.text}
          labelColor={theme.subtext}
          pickerBackgroundColor={theme.background}
          searchBackgroundColor={theme.card}
          searchBorderColor={theme.border}
          placeholderColor={theme.subtext}
          renderFlag={(country) => (
            <CountryFlag isoCode={country.code} size={22} />
          )}
        />
      </View>

      {/* Circle FAB */}
      {/* <FAB
        icon={<Plus size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />}
        onPress={() => {}}
        position="bottom-left"
        borderRadius={16}
        backgroundColor={theme.text} // Black in light, White in dark
        shadowColor={colorScheme === 'dark' ? '#fff' : '#000'}
      /> */}

      {/* Circle FAB Top Left */}
      {/* <FAB
        icon={<Filter size={20} color={colorScheme === 'dark' ? '#000' : '#fff'} />}
        onPress={() => {}}
        position="top-left"
        size="small"
        backgroundColor={theme.text}
        offsetY={60}
        shadowColor={colorScheme === 'dark' ? '#fff' : '#000'}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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
});