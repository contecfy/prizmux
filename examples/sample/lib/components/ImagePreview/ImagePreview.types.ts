import { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface ImagePreviewProps {
  visible: boolean;
  images: string | string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
  closeIcon?: ReactNode;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;

  // Colors
  backgroundColor?: string;
  backdropColor?: string;
  textColor?: string;
  headerBackgroundColor?: string;
  buttonBackgroundColor?: string;
  loadingColor?: string;

  // Styles
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  footerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  
  // Button Styles
  closeButtonStyle?: ViewStyle;
  prevButtonStyle?: ViewStyle;
  nextButtonStyle?: ViewStyle;
  
  // Additional Styles
  counterStyle?: TextStyle;
  navButtonStyle?: ViewStyle;
}