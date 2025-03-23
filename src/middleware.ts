// Stub middleware function in case next-auth is not available
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Just continue to the next middleware/page
  return NextResponse.next();
}

export const config = { 
  matcher: ['/admin/:path*', '/api/admin/:path*'] 
}