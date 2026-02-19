import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type SidebarSide = 'left' | 'right' | 'top' | 'bottom';

export interface SidebarMenuItem {
  id: string;
  title: string;
  icon?: ReactNode;
  onPress: () => void;
  badge?: number | string;
  badgeColor?: string;
}

export interface SidebarProps {
  visible: boolean;
  onClose: () => void;

  items: SidebarMenuItem[];

  // Slide direction
  side?: SidebarSide;           // default 'right'

  // Size
  width?: number;               // used when side is left/right (default 56% screen width)
  height?: number;              // used when side is top/bottom (default 50% screen height)

  // Offset from the edge
  offsetTop?: number;           // only applies for left/right — distance from top (default 0 = full height)
  offsetSide?: number;          // only applies for left/right — gap from screen edge (default 0)

  // Overlay
  showOverlay?: boolean;        // default true
  overlayColor?: string;        // default 'rgba(0,0,0,0.3)'
  dismissOnOverlayPress?: boolean; // default true

  // Drawer colors & shape
  backgroundColor?: string;     // default '#FFFFFF'
  borderRadius?: number;        // applied to the opening corners (default 0)

  // Header
  header?: ReactNode;
  showHeader?: boolean;         // default true if header is provided
  headerStyle?: ViewStyle;

  // Icon container
  showIconBackground?: boolean; // whether icons get a bg circle (default false)
  iconBackgroundColor?: string; // icon bg color if showIconBackground is true
  iconBorderRadius?: number;    // default 8

  // Item styling
  activeItemColor?: string;     // pressed bg color (default '#F3F4F6')
  itemTextColor?: string;       // default '#111827'

  // Badge styling
  badgeBorderRadius?: number;   // default 12 (pill)

  // Shadows
  shadow?: boolean;             // default true

  // Styles
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
}