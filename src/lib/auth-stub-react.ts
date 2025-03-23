import { createContext, useContext as reactUseContext, ReactNode } from 'react';

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

// Create the context directly
const InternalContext = createContext<SessionContextValue>({
  data: null,
  status: 'unauthenticated'
});

// Export a helper to use the context
export function useSessionContext() {
  return reactUseContext(InternalContext);
}

// Export the SessionContext components in a way that doesn't conflict with namespace
export const SessionContext = {
  // Don't try to use these providers directly in JSX, use the SessionProvider component below
  _provider: InternalContext.Provider,
  _consumer: InternalContext.Consumer
};

// SessionProvider component
export function SessionProvider({ children }: { children: ReactNode }) {
  return React.createElement(
    InternalContext.Provider,
    { value: { data: null, status: 'unauthenticated' } },
    children
  );
}

// useSession hook
export function useSession() {
  return useSessionContext();
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