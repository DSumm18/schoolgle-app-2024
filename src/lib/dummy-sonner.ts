// This is a dummy implementation for sonner to avoid TypeScript errors
import { ReactNode } from 'react';

export interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: object;
  className?: string;
  style?: React.CSSProperties;
  offset?: string | number;
}

export function Toaster(props: ToasterProps): JSX.Element {
  // Return an empty div in the dummy implementation
  return {} as any;
}

export interface ToastOptions {
  id?: string | number;
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
  dismissible?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  important?: boolean;
  custom?: ReactNode;
}

export function toast(message: string | ReactNode, options?: ToastOptions): void {
  // Do nothing in the dummy implementation
}

toast.success = (message: string | ReactNode, options?: ToastOptions) => {};
toast.error = (message: string | ReactNode, options?: ToastOptions) => {};
toast.warning = (message: string | ReactNode, options?: ToastOptions) => {};
toast.info = (message: string | ReactNode, options?: ToastOptions) => {};
toast.loading = (message: string | ReactNode, options?: ToastOptions) => {};
toast.promise = <T>(promise: Promise<T>, options?: {
  loading?: string | ReactNode;
  success?: string | ReactNode | ((data: T) => string | ReactNode);
  error?: string | ReactNode | ((error: any) => string | ReactNode);
}): Promise<T> => {
  return promise;
};
toast.dismiss = (id?: string | number) => {};