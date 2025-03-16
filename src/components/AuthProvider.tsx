'use client';

import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * AuthProvider component that wraps the application in SessionProvider
 * This enables the use of useSession() hook and other NextAuth features
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}