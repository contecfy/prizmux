import { ReactNode } from 'react';

export interface HeaderAction {
  icon: ReactNode;
  onPress: () => void;
  badge?: number | string;
}

export interface HeaderWithBackProps {
  title: string;
  avatar?: ReactNode;        // consumer renders whatever they want — Image, avatar lib, initials, etc.
  titlePosition?: 'left' | 'center' | 'right';
  onBackPress: () => void;   // required — no hidden router dependency
  backIcon?: ReactNode;      // optional custom back icon, falls back to built-in ‹
  actions?: HeaderAction[];  // up to 4 icons on the right
}