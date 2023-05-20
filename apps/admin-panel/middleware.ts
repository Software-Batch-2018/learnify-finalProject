import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Beware loops when redirecting to the same directory
export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get('user')?.value;
  const url = request.nextUrl.clone();

  if (cookies) {
    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.next();
    } else {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: '/((?!api|.*\\..*|_next).*)',
};
