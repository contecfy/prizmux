import { ReactNode } from 'react'

export interface HeaderAction {
  icon: ReactNode
  onPress: () => void
  badge?: number | string
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
}
