import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Paths that are always accessible
  const publicPaths = ['/', '/login', '/register', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path));
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // If not authenticated, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // Admin only paths
  const adminOnlyPaths = ['/admin'];
  const isAdminPath = adminOnlyPaths.some(path => pathname.startsWith(path));
  
  // Check admin access
  if (isAdminPath && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
} 