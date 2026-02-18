import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COUNTRIES, Country } from './countries';
import type { PhoneInputProps } from './PhoneInput.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'US')!;

function detectCountryFromInput(input: string, pool: Country[]): Country | null {
  if (!input.startsWith('+')) return null;
  const sorted = [...pool].sort((a, b) => b.dial.length - a.dial.length);
  return sorted.find((c) => input.startsWith(c.dial)) ?? null;
}

const FallbackFlag = ({ code }: { code: string }) => (
  <View style={styles.fallbackFlag}>
    <Text style={styles.fallbackFlagText}>{code}</Text>
  </View>
);

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountryCode = 'US',
  allowedCountries,
  placeholder = '712 345 678',
  label,
  error,
  disabled = false,
  pickerTitle = 'Select Country',
  searchPlaceholder = 'Search country or dial code...',
  dropdownIcon,
  renderFlag,
  containerStyle,
  inputRowStyle,
  selectorStyle,
  inputStyle,
  labelStyle,
  errorStyle,
}) => {
  const countryPool = useMemo(() => {
    if (!allowedCountries || allowedCountries.length === 0) return COUNTRIES;
    const set = new Set(allowedCountries.map((c) => c.toUpperCase()));
    return COUNTRIES.filter((c) => set.has(c.code));
  }, [allowedCountries]);

  const initialCountry = useMemo(() => {
    return (
      countryPool.find((c) => c.code === defaultCountryCode) ??
      countryPool[0] ??
      DEFAULT_COUNTRY
    );
  }, [countryPool, defaultCountryCode]);

  const [country, setCountry] = useState<Country>(value?.country ?? initialCountry);
  const [number, setNumber] = useState(value?.number ?? '');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Animation values — same pattern as BottomSheet
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [sheetHeight, setSheetHeight] = useState(SCREEN_HEIGHT * 0.85);

  const openPicker = useCallback(() => {
    setPickerVisible(true);
    Animated.parallel([
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
    ]).start();
  }, [backdropAnim, slideAnim]);

  const closePicker = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: sheetHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPickerVisible(false);
      setSearch('');
    });
  }, [backdropAnim, slideAnim, sheetHeight]);

  useEffect(() => {
    if (value) {
      setCountry(value.country);
      setNumber(value.number);
    }
  }, [value]);

  const emit = useCallback(
    (c: Country, n: string) => {
      onChange({ country: c, number: n, full: `${c.dial}${n}` });
    },
    [onChange]
  );

  const handleNumberChange = (text: string) => {
    if (text.startsWith('+')) {
      const detected = detectCountryFromInput(text, countryPool);
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
    emit(selected, number);
    closePicker();
    setTimeout(() => inputRef.current?.focus(), 350);
  };

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return countryPool;
    return countryPool.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search, countryPool]);

  const renderFlagNode = (c: Country) =>
    renderFlag ? renderFlag(c) : <FallbackFlag code={c.code} />;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        style={[
          styles.inputRow,
          error ? styles.inputRowError : null,
          disabled ? styles.inputRowDisabled : null,
          inputRowStyle,
        ]}
      >
        {countryPool.length > 1 ? (
          <Pressable
            style={[styles.selector, selectorStyle]}
            onPress={() => !disabled && openPicker()}
            accessibilityLabel={`Selected country: ${country.name} ${country.dial}`}
            accessibilityRole="button"
          >
            {renderFlagNode(country)}
            <Text style={styles.dialCode}>{country.dial}</Text>
            {dropdownIcon ?? <Text style={styles.defaultDropdownIcon}>▾</Text>}
          </Pressable>
        ) : (
          <View style={[styles.selector, selectorStyle]}>
            {renderFlagNode(country)}
            <Text style={styles.dialCode}>{country.dial}</Text>
          </View>
        )}

        <View style={styles.divider} />

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

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}

      {/* Picker modal — animated exactly like BottomSheet */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="none"
        onRequestClose={closePicker}
        statusBarTranslucent
      >
        {/* Animated backdrop */}
        <Pressable style={styles.backdropPressable} onPress={closePicker}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropAnim }]}
          />
        </Pressable>

        {/* Animated sheet */}
        <Animated.View
          style={[
            styles.pickerSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            setSheetHeight(h);
            slideAnim.setValue(h);
            openPicker();
          }}
        >
          {/* Drag handle */}
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          {/* Header */}
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>{pickerTitle}</Text>
            <Pressable onPress={closePicker} style={styles.pickerClose} hitSlop={10}>
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

          {/* List */}
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
                {renderFlagNode(item)}
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
        </Animated.View>
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
  fallbackFlag: {
    width: 28,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackFlagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.5,
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
  // Modal / sheet
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: SCREEN_HEIGHT * 0.9,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: 24,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
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