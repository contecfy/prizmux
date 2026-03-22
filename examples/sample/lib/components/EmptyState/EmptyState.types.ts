import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;    // any icon, image, illustration — anything
  action?: ReactNode;  // consumer renders their own button if they want one

  // Customization
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  
  // Styles
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  actionContainerStyle?: ViewStyle;
  actionStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
}