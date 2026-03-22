import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type FABPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

export type FABSize = 'small' | 'medium' | 'large';

export interface FABProps {
  onPress: () => void;
  onLongPress?: () => void;

  // Content — icon only, text only, or both
  icon?: ReactNode;
  label?: string;               // text label next to / below icon
  labelPosition?: 'right' | 'left' | 'bottom' | 'top'; // where label sits relative to icon

  // Position — fixed on screen
  position?: FABPosition;
  offsetX?: number;             // horizontal offset from edge (default 16)
  offsetY?: number;             // vertical offset from edge (default 24)

  // Size
  size?: FABSize;               // small=40, medium=56, large=72
  borderRadius?: number;        // default is half of size (circle). Pass a lower value for rounded rect

  // Colors
  backgroundColor?: string;     // default '#6366F1'
  iconColor?: string;           // useful if passing a plain text icon
  labelColor?: string;
  shadowColor?: string;
  disabledBackgroundColor?: string;
  disabledLabelColor?: string;
  loadingColor?: string;

  // Shadow
  showShadow?: boolean;

  // State
  disabled?: boolean;
  loading?: boolean;            // shows activity indicator instead of icon

  // Styles
  style?: ViewStyle;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;   // the absolute positioned wrapper
}