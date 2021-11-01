import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/home') {
    if (!request.cookies.bucket) {
      const bucket = Math.random() >= 0.5 ? 'a' : 'b';
      const dest = `/home/${bucket}`;
      const response = NextResponse.rewrite(dest);
      response.cookie('bucket', bucket);
      return response;
    }
  
    const dest = `/home/${request.cookies.bucket}`;
    return NextResponse.rewrite(dest);
  }
}
