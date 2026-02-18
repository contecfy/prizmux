import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COUNTRIES, Country } from './Countries';
import type { PhoneInputProps, PhoneInputValue } from './PhoneInput.types';

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'US')!;

// Detect country from typed number — matches longest dial code first
function detectCountryFromInput(input: string): Country | null {
  if (!input.startsWith('+')) return null;
  // sort by dial length desc so +1868 matches before +1
  const sorted = [...COUNTRIES].sort(
    (a, b) => b.dial.length - a.dial.length
  );
  return sorted.find((c) => input.startsWith(c.dial)) ?? null;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountryCode = 'US',
  placeholder = '712 345 678',
  label,
  error,
  disabled = false,
  pickerTitle = 'Select Country',
  searchPlaceholder = 'Search country or dial code...',
  dropdownIcon,
  containerStyle,
  inputRowStyle,
  selectorStyle,
  inputStyle,
  labelStyle,
  errorStyle,
}) => {
  const initialCountry =
    COUNTRIES.find((c) => c.code === defaultCountryCode) ?? DEFAULT_COUNTRY;

  const [country, setCountry] = useState<Country>(
    value?.country ?? initialCountry
  );
  const [number, setNumber] = useState(value?.number ?? '');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Keep internal state in sync if value prop changes externally
  useEffect(() => {
    if (value) {
      setCountry(value.country);
      setNumber(value.number);
    }
  }, [value]);

  const emit = useCallback(
    (c: Country, n: string) => {
      onChange({
        country: c,
        number: n,
        full: `${c.dial}${n}`,
      });
    },
    [onChange]
  );

  const handleNumberChange = (text: string) => {
    // If user pastes/types a full number starting with +, auto-detect country
    if (text.startsWith('+')) {
      const detected = detectCountryFromInput(text);
      if (detected) {
        const local = text.slice(detected.dial.length);
        setCountry(detected);
        setNumber(local);
        emit(detected, local);
        return;
      }
    }
    setNumber(text);
    emit(country, text);
  };

  const handleSelectCountry = (selected: Country) => {
    setCountry(selected);
    setPickerVisible(false);
    setSearch('');
    emit(selected, number);
    // refocus input after picker closes
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const isFocused = false; // visual focus handled by native input

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}

      {/* Input row */}
      <View
        style={[
          styles.inputRow,
          error ? styles.inputRowError : null,
          disabled ? styles.inputRowDisabled : null,
          inputRowStyle,
        ]}
      >
        {/* Country selector */}
        <Pressable
          style={[styles.selector, selectorStyle]}
          onPress={() => !disabled && setPickerVisible(true)}
          accessibilityLabel={`Selected country: ${country.name} ${country.dial}`}
          accessibilityRole="button"
        >
          <Text style={styles.flag}>{country.flag}</Text>
          <Text style={styles.dialCode}>{country.dial}</Text>
          {dropdownIcon ?? (
            <Text style={styles.defaultDropdownIcon}>▾</Text>
          )}
        </Pressable>

        <View style={styles.divider} />

        {/* Number input */}
        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyle]}
          value={number}
          onChangeText={handleNumberChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          editable={!disabled}
          accessibilityLabel="Phone number input"
          maxLength={15}
        />
      </View>

      {/* Error */}
      {error && (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      )}

      {/* Country picker modal */}
      <Modal
        visible={pickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.pickerSheet}>
            {/* Picker header */}
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>{pickerTitle}</Text>
              <Pressable
                onPress={() => {
                  setPickerVisible(false);
                  setSearch('');
                }}
                style={styles.pickerClose}
                hitSlop={10}
              >
                <Text style={styles.pickerCloseText}>✕</Text>
              </Pressable>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor="#9CA3AF"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Country list */}
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.countryRow,
                    item.code === country.code && styles.countryRowSelected,
                  ]}
                  onPress={() => handleSelectCountry(item)}
                  android_ripple={{ color: '#F3F4F6' }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.countryDial}>{item.dial}</Text>
                </Pressable>
              )}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  inputRowError: {
    borderColor: '#EF4444',
  },
  inputRowDisabled: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 6,
  },
  flag: {
    fontSize: 22,
  },
  dialCode: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  defaultDropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  // Picker modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pickerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  pickerClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerCloseText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    gap: 12,
  },
  countryRowSelected: {
    backgroundColor: '#F0F9FF',
  },
  countryFlag: {
    fontSize: 24,
  },
  countryName: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  countryDial: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
  },
});