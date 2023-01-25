import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if(req.nextUrl.pathname.match(/^\/admin\/?$/)) return NextResponse.redirect(new URL("/admin/categories", req.url));
    return NextResponse.next();
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
