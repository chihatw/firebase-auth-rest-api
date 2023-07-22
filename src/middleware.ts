import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyIdToken } from './domains/auth/infrastructure/firebase';

export async function middleware(request: NextRequest) {
  const idToken = request.cookies.get('idToken');
  const refreshToken = request.cookies.get('refreshToken');
  if (isProtectedRoutes(request)) {
    /**
     * Protected Routes
     */

    // クッキーがなければ
    if (!idToken || !refreshToken) {
      // login にリダイレクト
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // クッキーがあれば、
    const {
      verified,
      idToken: newIdToken,
      expiresIn,
    } = await verifyIdToken(idToken.value, refreshToken.value);

    if (!verified) {
      // idToken が無効ならば login にリダイレクト
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('idToken');
      response.cookies.delete('refreshToken');
      return response;
    }
    if (newIdToken && expiresIn) {
      const response = NextResponse.next();
      const option = {
        maxAge: expiresIn, // default 3600 sec（1時間）
        httpOnly: true,
        secure: true,
      };
      response.cookies.set('idToken', newIdToken, option);
      return response;
    }
  } else if (isGuestRoutes(request)) {
    /**
     * Guest Routes
     */
    if (!!idToken) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }
  }

  return NextResponse.next();
}

const isProtectedRoutes = (request: NextRequest) => {
  return request.nextUrl.pathname.startsWith('/protected');
};

const isGuestRoutes = (request: NextRequest) => {
  return request.nextUrl.pathname.startsWith('/login');
};
