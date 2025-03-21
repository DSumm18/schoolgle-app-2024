// Stub middleware function in case next-auth is not available
export default function middleware() { 
  return Response.next(); 
}

export const config = { 
  matcher: ['/admin/:path*', '/api/admin/:path*'] 
}