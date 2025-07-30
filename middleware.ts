// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { decrypt } from './app/lib/session'; 

const protectedRoutes = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (nextAuthToken) {
    return NextResponse.next();
  }


  const sessionCookie = req.cookies.get('session')?.value;

  if (sessionCookie) {
    try {
      const session = await decrypt(sessionCookie);
      const expiresAt = new Date(session?.expiresAt || '');

      if (session?.email && expiresAt > new Date()) {
        return NextResponse.next();
      }
    } catch (error) {
      console.log('Invalid custom session:', error);
    }
  }


  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/dashboard'],
};

