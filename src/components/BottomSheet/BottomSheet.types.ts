import { ReactNode } from 'react';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  dismissOnTouchOutside?: boolean;
  showCloseButton?: boolean;
  showDragHandle?: boolean;
  swipeToClose?: boolean;
  closeIcon?: ReactNode;
}