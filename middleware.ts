import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie?.value) {
      // No session, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      const isExpired = Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000; // 24 hours
      
      if (isExpired || !sessionData.isAuthenticated) {
        // Session expired or invalid, redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('admin-session');
        return response;
      }
    } catch (error) {
      // Invalid session data, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin-session');
      return response;
    }
  }
  
  // Check if user is already authenticated and trying to access login page
  if (pathname === '/login') {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (sessionCookie?.value) {
      try {
        const sessionData = JSON.parse(sessionCookie.value);
        const isExpired = Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000;
        
        if (!isExpired && sessionData.isAuthenticated) {
          // User is authenticated, redirect to admin
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        // Invalid session data, continue to login page
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login']
};