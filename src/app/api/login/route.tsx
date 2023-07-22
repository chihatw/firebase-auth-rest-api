import { signInWithPassword } from '@/domains/auth/infrastructure/firebase';
import { setCookies } from '@/domains/auth/infrastructure/nextjs';
import { NextRequest, NextResponse } from 'next/server';

// https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const response = await signInWithPassword(email, password);
  const json = await response.json();
  if (!response.ok) {
    const { error } = json;
    return NextResponse.json(error, { status: 400 });
  } else {
    const { idToken, refreshToken, expiresIn } = json;
    if (idToken && refreshToken && expiresIn) {
      setCookies(idToken, refreshToken, expiresIn);
      return NextResponse.json({}, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 400 });
    }
  }
}
