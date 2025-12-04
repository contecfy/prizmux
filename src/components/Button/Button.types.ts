import { ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

