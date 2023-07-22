import { deleteCookies } from '@/domains/auth/infrastructure/nextjs';
import { NextResponse } from 'next/server';

export const POST = async () => {
  deleteCookies();
  return NextResponse.json({}, { status: 200 });
};
