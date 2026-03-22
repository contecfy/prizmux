import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface AlertProps {
  visible: boolean;
  onClose: () => void;

  // Content
  title?: string;
  message?: string;
  icon?: ReactNode;             // optional icon above title
  children?: ReactNode;         // anything — custom buttons, inputs, whatever

  // Dismiss
  dismissOnBackdropPress?: boolean; // default true

  // Shape & colors
  borderRadius?: number;        // default 16
  backgroundColor?: string;     // default #FFFFFF
  overlayColor?: string;        // default rgba(0,0,0,0.5)
  shadowColor?: string;
  titleColor?: string;
  messageColor?: string;

  // Styles
  style?: ViewStyle;            // alert box
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  overlayStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle; // wrapper around children
}