// Mock next-auth/react implementation for static sites
import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext, useContext } from 'react'

// Session context for the mock implementation
const SessionContext = createContext<any>(null)

export function useSession() {
  const session = useContext(SessionContext)
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
  const [session, setSession] = useState<any>(null)
  
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

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}