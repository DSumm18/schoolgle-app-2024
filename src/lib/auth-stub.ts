// This is a placeholder auth implementation when next-auth is not installed

interface Token {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface Session {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const authOptions = {
  providers: [],
  callbacks: {
    async authorize() {
      // This is a stub implementation
      // In a real app, validation would happen here
      return { id: '1', name: 'Admin User', email: 'admin@school.com' };
    },
    async jwt({ token }: { token: Token }) {
      return token;
    },
    async session({ session }: { session: Session }) {
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}