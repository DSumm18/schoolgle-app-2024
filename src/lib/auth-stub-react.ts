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

// Create the context directly (no namespace)
const SessionContextInternal = createContext<SessionContextValue>({
  data: null,
  status: 'unauthenticated'
});

// Export the context with its components
export const SessionContext = {
  Provider: SessionContextInternal.Provider,
  Consumer: SessionContextInternal.Consumer
};

// Helper to use the context
export function useSessionContext() {
  return reactUseContext(SessionContextInternal);
}

// SessionProvider component
export function SessionProvider({ children }: { children: ReactNode }) {
  // Use the provider directly
  const ContextProvider = SessionContext.Provider;
  return (
    <ContextProvider value={{ data: null, status: 'unauthenticated' }}>
      {children}
    </ContextProvider>
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