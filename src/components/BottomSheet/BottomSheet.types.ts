import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  dismissOnTouchOutside?: boolean;
  showCloseButton?: boolean;
  showDragHandle?: boolean;
  swipeToClose?: boolean;
  closeIcon?: ReactNode;
  
  // Customization
  containerStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  handleStyle?: ViewStyle;
  handleContainerStyle?: ViewStyle;
  closeButtonStyle?: ViewStyle;
  closeIconStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  
  // Colors
  backgroundColor?: string;
  backdropColor?: string;
  textColor?: string;
  handleColor?: string;
  shadowColor?: string;
  borderColor?: string;
  borderRadius?: number;
  
  // Header Refinements
  showHeaderBorder?: boolean;
  headerBorderBottomColor?: string;
  closePosition?: 'left' | 'right';
  titlePosition?: 'left' | 'center' | 'right';
}