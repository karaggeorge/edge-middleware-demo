import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/dynamic/hola') {
    return new Response(
      JSON.stringify(Object.fromEntries(request.headers)),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  if (request.nextUrl.pathname === '/dynamic/greet') {
    new Response(
      JSON.stringify({
        message:
          request.nextUrl.searchParams.get('greeting') || 'Hi friend',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
