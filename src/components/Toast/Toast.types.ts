import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top' | 'bottom';
export type ToastDismiss = 'auto' | 'manual' | 'both';
export type SwipeDirection = 'horizontal' | 'vertical' | 'both';

export interface ToastProps {
  visible: boolean;
  onHide: () => void;

  text: string;
  description?: string;

  type?: ToastType;
  position?: ToastPosition;
  dismiss?: ToastDismiss;
  duration?: number;

  // Swipe to dismiss
  swipeable?: boolean;
  swipeDirection?: SwipeDirection;
  swipeThreshold?: number;

  // Custom rendering
  icon?: ReactNode;
  closeIcon?: ReactNode;

  // Colors — override type defaults
  backgroundColor?: string;
  textColor?: string;
  descriptionColor?: string;      // separate color for description if needed
  shadowColor?: string;           // toast shadow

  // Shape
  borderRadius?: number;          // default 10

  // Full style overrides — consumer can change anything
  style?: ViewStyle;              // outer toast container
  textStyle?: TextStyle;          // main text
  descriptionStyle?: TextStyle;   // description text
  iconContainerStyle?: ViewStyle; // wrapper around the icon
  closeButtonStyle?: ViewStyle;   // wrapper around the close button
  overlayStyle?: ViewStyle;       // the full screen overlay behind the toast
}