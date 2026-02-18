import { ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;    // any icon, image, illustration — anything
  action?: ReactNode;  // consumer renders their own button if they want one
}