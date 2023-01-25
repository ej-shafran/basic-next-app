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
      authorized: (params) => {
        if(params.req.nextUrl.pathname.startsWith("/admin")) return params.token && params.token.role === Role.ADMIN

        return !!params.token;
      }
    }
  }
);

export const config = {
  matcher: ["/admin/:path*", "/store/storefront"]
}
