import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if(req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();

    return NextResponse.redirect(new URL("/admin/test", req.url));
  },
  {
    callbacks: {
      authorized: (params) => params.token && params.token.role === Role.ADMIN
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"]
}
