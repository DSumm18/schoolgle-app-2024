import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is just a stub for static export
        // Real authentication happens in the client code
        if (credentials?.email === 'admin@school.com' && credentials?.password === 'admin') {
          return {
            id: '1',
            name: 'School Admin',
            email: credentials.email,
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
  },
}