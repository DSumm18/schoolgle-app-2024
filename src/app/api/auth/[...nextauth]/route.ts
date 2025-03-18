import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock of users for demo purposes
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    name: "Demo User",
    password: "password123", // In a real app, passwords would be hashed
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // For demo purposes, just accept any credentials
          // In a real app, this would verify against a database
          
          // Mock user lookup
          const user = mockUsers.find(u => u.email === credentials.email);
          
          if (!user || user.password !== credentials.password) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // For development, using a simple secret
  secret: process.env.NEXTAUTH_SECRET || "DEVELOPMENT_SECRET_DO_NOT_USE_IN_PRODUCTION",
});

export { handler as GET, handler as POST };