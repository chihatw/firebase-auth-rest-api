import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (isProtectedRoutes(request)) {
    /**
     * Protected Routes
     */

    // クッキーがなければ
    if (!session) {
      // login にリダイレクト
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // クッキーがあれば、
    const responseAPI = await fetch(`http://localhost:3000/api/login`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });

    if (responseAPI.status !== 200) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  } else if (isGuestRoute(request)) {
    /**
     * Guest Routes
     */
    if (!!session) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }
  }

  return NextResponse.next();
}

const isProtectedRoutes = (request: NextRequest) => {
  return request.nextUrl.pathname.startsWith('/protected');
};

const isGuestRoute = (request: NextRequest) => {
  return request.nextUrl.pathname.startsWith('/login');
};
