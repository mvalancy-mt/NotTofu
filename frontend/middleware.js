import { NextResponse } from 'next/server';

// Middleware function to handle CORS
export function middleware(request) {
  const response = NextResponse.next();
  
  // Set CORS headers for API routes if needed
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  return response;
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
    // Skip all static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 