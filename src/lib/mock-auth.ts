import { useState, useEffect, createContext, useContext as reactUseContext } from 'react'

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

// Create a namespace for SessionContext with its implementation inside
export namespace SessionContext {
  // Internal context
  const _context = createContext<SessionContextType>({
    data: null,
    status: 'unauthenticated'
  })
  
  // Export Provider and Consumer
  export const Provider = _context.Provider
  export const Consumer = _context.Consumer
  
  // Helper to use the context
  export function useSessionContext() {
    return reactUseContext(_context)
  }
}

// Mock version of useSession hook
export function useSession() {
  return SessionContext.useSessionContext()
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
  
  return (
    <SessionContext.Provider value={{ data: session, status }}>
      {children}
    </SessionContext.Provider>
  )
}