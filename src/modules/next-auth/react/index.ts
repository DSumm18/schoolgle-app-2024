// Mock next-auth/react implementation for static sites
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext, useContext } from 'react'

// Define the session context type
interface SessionContextType {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
  };
  expires?: string;
  [key: string]: any;
}

// Create internal context
const InternalSessionContext = createContext<SessionContextType | null>(null)

// Export the context with its provider
export const SessionContext = {
  // These are not meant to be used directly in JSX
  _provider: InternalSessionContext.Provider,
  _consumer: InternalSessionContext.Consumer
}

export function useSession() {
  const session = useContext(InternalSessionContext)
  return {
    data: session,
    status: session ? 'authenticated' : 'unauthenticated',
    update: () => Promise.resolve(session)
  }
}

export function signIn(provider: string, options: any) {
  // Simple mock implementation that works with credentials
  if (provider === 'credentials' && 
      options?.email === 'admin@school.com' && 
      options?.password === 'admin') {
    return Promise.resolve({ error: null })
  }
  return Promise.resolve({ error: 'Invalid credentials' })
}

export function signOut() {
  return Promise.resolve({ url: '/auth/signin' })
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionContextType | null>(null)
  
  // Check local storage on client for session data
  useEffect(() => {
    const storedSession = typeof window !== 'undefined' ? 
      localStorage.getItem('mockSession') : null
    
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession))
      } catch (e) {
        localStorage.removeItem('mockSession')
      }
    }
  }, [])

  // Use React.createElement to avoid JSX type errors with components stored in variables
  return React.createElement(
    InternalSessionContext.Provider,
    { value: session },
    children
  )
}