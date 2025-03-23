import { createContext, useContext, ReactNode } from 'react';

// Define session types
export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface Session {
  user?: User;
  expires: string;
  [key: string]: any;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface SessionContextValue {
  data: Session | null;
  status: AuthStatus;
  update?: (data?: any) => Promise<Session | null>;
}

// Create SessionContext
const SessionContext = createContext<SessionContextValue>({
  data: null,
  status: 'unauthenticated'
});

// Create a namespace for SessionContext to match expected usage with Provider
export namespace SessionContext {
  export const Provider = SessionContext.Provider;
}

// SessionProvider component
export function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <SessionContext.Provider value={{ data: null, status: 'unauthenticated' }}>
      {children}
    </SessionContext.Provider>
  );
}

// useSession hook
export function useSession() {
  return useContext(SessionContext);
}

// Sign in function
export function signIn(provider: string, options?: any) {
  console.log('Sign in called with', provider, options);
  return Promise.resolve({ error: null });
}

// Sign out function
export function signOut() {
  console.log('Sign out called');
  return Promise.resolve({ url: '/auth/signin' });
}