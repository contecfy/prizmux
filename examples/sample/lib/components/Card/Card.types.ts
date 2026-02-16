import { ViewProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface CardProps extends ViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

