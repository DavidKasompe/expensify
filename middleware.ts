import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/dashboard/audit-logs') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (
      pathname.startsWith('/dashboard/reports') &&
      token?.role !== 'ADMIN' &&
      token?.role !== 'FINANCE_OFFICER'
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (
      pathname.startsWith('/dashboard/projects/new') &&
      token?.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/dashboard/projects', req.url));
    }
    return NextResponse.next();
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = { matcher: ['/dashboard/:path*'] };
