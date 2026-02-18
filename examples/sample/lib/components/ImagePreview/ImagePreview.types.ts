import { ReactNode } from 'react';

export interface ImagePreviewProps {
  visible: boolean;
  images: string | string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
  closeIcon?: ReactNode;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
}