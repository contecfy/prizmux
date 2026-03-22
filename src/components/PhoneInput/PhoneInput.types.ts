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

  // Customization Colors
  backgroundColor?: string;
  borderColor?: string;
  errorColor?: string;
  placeholderColor?: string;
  textColor?: string;
  selectionColor?: string;
  backdropColor?: string;
  pickerBackgroundColor?: string;
  searchBackgroundColor?: string;
  searchBorderColor?: string;
  dropdownIconColor?: string;
  dividerColor?: string;
  labelColor?: string;

  // Styles
  containerStyle?: ViewStyle;
  inputRowStyle?: ViewStyle;
  selectorStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  
  // Modal / Picker Styles
  pickerSheetStyle?: ViewStyle;
  pickerHeaderStyle?: ViewStyle;
  pickerTitleStyle?: TextStyle;
  closeIconStyle?: TextStyle;
  closeButtonStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  searchInputContainerStyle?: ViewStyle;
  pickerItemStyle?: ViewStyle;
  pickerItemTextStyle?: TextStyle;
  
  // NEW from audit
  countryRowStyle?: ViewStyle;
  countryNameStyle?: TextStyle;
  countryDialStyle?: TextStyle;
  backdropStyle?: ViewStyle;
}