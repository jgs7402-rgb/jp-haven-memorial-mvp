import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply to /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow /admin/login (public entry point)
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check cookie
  const adminSession = req.cookies.get('admin_session')?.value;

  if (!adminSession) {
    const loginUrl = new URL('/admin/login', req.url);
    // Optional: 로그인 후 돌아갈 경로 저장
    // loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};







