import { useState, useEffect, createContext, useContext } from 'react'

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

// Create a context for our mock session
const SessionContext = createContext<SessionContextType>({
  data: null,
  status: 'unauthenticated'
})

// Create a namespace for SessionContext to match expected usage with Provider
// This is needed because the code expects to use SessionContext.Provider
export namespace SessionContext {
  export const Provider = SessionContext.Provider;
}

// Mock version of useSession hook
export function useSession() {
  const context = useContext(SessionContext)
  return context
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