import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface ButtonProps {
  title?: string;                        // optional — supports icon-only buttons
  onPress: () => void;
  onLongPress?: () => void;
  variant?: 'filled' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  borderRadius?: number;                 // NEW — no longer hardcoded
  hitSlop?: number;                      // NEW — easier tap target
  accessibilityLabel?: string;           // NEW — screen reader support
  style?: ViewStyle;
  contentStyle?: ViewStyle;             // NEW — style the inner content wrapper
  textStyle?: TextStyle;
  // Color Overrides
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  loadingColor?: string;
  // Shadow & Feedback
  showShadow?: boolean;
  shadowColor?: string;
  pressedBackgroundColor?: string;
}