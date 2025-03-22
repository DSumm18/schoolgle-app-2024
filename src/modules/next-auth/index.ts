// Mock implementation of next-auth for static sites
import { AuthOptions as NextAuthOptions } from './types'

export type { NextAuthOptions }

export const SessionStrategy = {
  JWT: 'jwt',
} as const

export default function NextAuth(options: NextAuthOptions) {
  // This is just a stub
  return {
    handlers: {
      GET: async () => new Response('Auth API stub - GET'),
      POST: async () => new Response('Auth API stub - POST'),
    },
  }
}