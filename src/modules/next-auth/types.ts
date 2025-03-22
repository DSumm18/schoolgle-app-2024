// Mock types for next-auth
export interface User {
  id: string
  name?: string
  email?: string
  image?: string
  role?: string
}

export interface Session {
  user?: User
  expires: string
}

export interface Provider {
  id: string
  name: string
  type: string
  credentials?: Record<string, any>
  authorize?: (credentials: Record<string, any>) => Promise<User | null>
}

export interface AuthOptions {
  providers: Provider[]
  pages?: {
    signIn?: string
    signOut?: string
    error?: string
    verifyRequest?: string
    newUser?: string
  }
  callbacks?: {
    signIn?: (params: any) => Promise<boolean>
    redirect?: (params: any) => Promise<string>
    session?: (params: any) => Promise<any>
    jwt?: (params: any) => Promise<any>
  }
  secret?: string
  session?: {
    strategy?: 'jwt' | 'database'
    maxAge?: number
    updateAge?: number
  }
}