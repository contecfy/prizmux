import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface ContextMenuItem {
  id: string;
  title: string;
  icon?: ReactNode;
  onPress: () => void;
  badge?: number | string;
  badgeColor?: string;
}

export interface ContextMenuProps {
  /** Show/hide the menu */
  visible: boolean;
  onClose: () => void;

  /** Menu items */
  items: ContextMenuItem[];

  /** Position relative to the parent or screen */
  position?: { top?: number; left?: number; right?: number; bottom?: number };

  /** Menu appearance */
  backgroundColor?: string;    // default: '#fff'
  borderRadius?: number;       // default: 8

  /** Item text styling */
  itemTextColor?: string;      // default: '#111827'
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;

  /** Badge styling */
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;

  /** Icon styling */
  showIconBackground?: boolean;     // default: false
  iconBackgroundColor?: string;     // default: 'rgba(0,0,0,0.06)'
  iconBorderRadius?: number;        // default: 6

  /** Animation for showing/hiding the menu */
  animation?: 'fade' | 'scale' | 'fade-scale' | 'none'; // default: 'fade-scale'

  /** Optional shadow */
  shadow?: boolean;                 // default: true
}