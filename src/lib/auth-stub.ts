// This is a placeholder auth implementation when next-auth is not installed
export const authOptions = {
  providers: [],
  callbacks: {
    async authorize() {
      // This is a stub implementation
      // In a real app, validation would happen here
      return { id: '1', name: 'Admin User', email: 'admin@school.com' };
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}