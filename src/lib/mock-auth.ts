import React, { useState, useEffect, createContext, useContext as reactUseContext } from 'react'

// Define types for our mocked auth system
export interface User {
  id: string
  name?: string
  email?: string
  role?: string
}

export interface Session {
  user?: User
  expires: string
}

interface SessionContextType {
  data: Session | null
  status: 'authenticated' | 'unauthenticated' | 'loading'
}

// Create the context directly
const InternalContext = createContext<SessionContextType>({
  data: null,
  status: 'unauthenticated'
})

// Export a helper to use the context
export function useSessionContext() {
  return reactUseContext(InternalContext)
}

// Export the SessionContext components in a way that doesn't conflict with namespace
export const SessionContext = {
  // Don't try to use these providers directly in JSX, use the SessionProvider component below
  _provider: InternalContext.Provider,
  _consumer: InternalContext.Consumer
}

// Mock version of useSession hook
export function useSession() {
  return useSessionContext()
}

// Mock version of signIn function
export function signIn(provider: string, options: any) {
  // Check if credentials match our hardcoded values
  if (
    provider === 'credentials' &&
    options?.email === 'admin@school.com' &&
    options?.password === 'admin'
  ) {
    // Store session data in localStorage
    const session = {
      user: {
        id: '1',
        name: 'School Admin',
        email: options.email,
        role: 'admin'
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
    
    localStorage.setItem('mockSession', JSON.stringify(session))
    return Promise.resolve({ error: null })
  }
  
  return Promise.resolve({ error: 'Invalid credentials' })
}

// Mock version of signOut function
export function signOut() {
  localStorage.removeItem('mockSession')
  return Promise.resolve({ url: '/auth/signin' })
}

// SessionProvider component to wrap the app
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('loading')
  
  // Initialize session from localStorage on component mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('mockSession')
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession)
        setSession(parsedSession)
        setStatus('authenticated')
      } else {
        setStatus('unauthenticated')
      }
    } catch (error) {
      console.error('Failed to parse session from localStorage', error)
      setStatus('unauthenticated')
    }
  }, [])
  
  // Use React.createElement instead of JSX to avoid TypeScript errors
  return React.createElement(
    InternalContext.Provider,
    { value: { data: session, status } },
    children
  )
}