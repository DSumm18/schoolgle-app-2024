import { CSSProperties } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tw-gradient-from'?: string;
    '--tw-gradient-to'?: string;
    '--tw-gradient-stops'?: string;
  }
}