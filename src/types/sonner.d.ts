declare module 'sonner' {
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
  
  export function Toaster(props: ToasterProps): JSX.Element;
  
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
  
  export function toast(message: string | ReactNode, options?: ToastOptions): void;
  toast.success: (message: string | ReactNode, options?: ToastOptions) => void;
  toast.error: (message: string | ReactNode, options?: ToastOptions) => void;
  toast.warning: (message: string | ReactNode, options?: ToastOptions) => void;
  toast.info: (message: string | ReactNode, options?: ToastOptions) => void;
  toast.loading: (message: string | ReactNode, options?: ToastOptions) => void;
  toast.promise: <T>(promise: Promise<T>, options?: {
    loading?: string | ReactNode;
    success?: string | ReactNode | ((data: T) => string | ReactNode);
    error?: string | ReactNode | ((error: any) => string | ReactNode);
  }) => Promise<T>;
  toast.dismiss: (id?: string | number) => void;
}