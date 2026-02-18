import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Country } from './countries';

export interface PhoneInputValue {
  country: Country;
  number: string;       // just the local number without dial code
  full: string;         // full number e.g. "+254712345678"
}

export interface PhoneInputProps {
  value?: PhoneInputValue;
  onChange: (value: PhoneInputValue) => void;
  defaultCountryCode?: string;         // ISO code e.g. 'UG', 'US' — defaults to 'US'
  allowedCountries?: string[];         // restrict to specific ISO codes e.g. ['UG', 'KE', 'TZ']
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;

  // Picker
  pickerTitle?: string;
  searchPlaceholder?: string;

  // Custom rendering
  dropdownIcon?: ReactNode;
  renderFlag?: (country: Country) => ReactNode;

  // Styles
  containerStyle?: ViewStyle;
  inputRowStyle?: ViewStyle;
  selectorStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}