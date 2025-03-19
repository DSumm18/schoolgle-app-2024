import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Only allow authenticated users with admin role to access /admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin'
      }
      return !!token
    },
  },
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}