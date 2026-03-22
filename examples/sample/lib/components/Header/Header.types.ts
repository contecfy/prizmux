import { ReactNode } from 'react'
import { ViewStyle, TextStyle } from 'react-native'

export interface HeaderAction {
  icon: ReactNode
  onPress: () => void
  badge?: number | string
  badgeStyle?: ViewStyle
  badgeTextStyle?: TextStyle
}

export interface HeaderProps {
  title: string
  avatar?: ReactNode
  titlePosition?: 'left' | 'center' | 'right'

  /** Back button control */
  showBack?: boolean
  onBackPress?: () => void
  backIcon?: ReactNode

  actions?: HeaderAction[]

  // Custom Styles
  style?: ViewStyle;
  titleStyle?: TextStyle;
  backButtonStyle?: ViewStyle;
  backIconStyle?: TextStyle;
  actionButtonStyle?: ViewStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  avatarContainerStyle?: ViewStyle;
  
  // Quick Color Overrides
  backgroundColor?: string;
  borderColor?: string;
  backButtonBackgroundColor?: string;
  backIconColor?: string;
  actionIconColor?: string;
}
