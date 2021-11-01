import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest, event) {
  console.log(`Req -> ${request.nextUrl.toString()}`)
  const url = request.nextUrl;
  
  if (url.pathname === '/proxy') {
    return fetch('https://vercel.com')
  }
  
  if (url.pathname === '/dynamic/hola') {
    console.log('Subrequesting to', event.request.url)  
    const res = await fetch(event.request.url, {
      headers: {
        ...Object.fromEntries(event.request.headers),
        'x-from-edge-subrequest': '1'
      },
    })
    
    console.log('status=>', res.status)
    
    return res;
  }

  if (url.pathname === '/rewrite-me-to-about') {
    url.pathname = '/about';
    url.searchParams.set('middleware', 'foo');
    return NextResponse.rewrite(url);
  }

  if (url.pathname === '/redirect-me-to-about') {
    url.pathname = '/about';
    url.searchParams.set('middleware', 'foo');
    return NextResponse.redirect(url);
  }

  if (url.pathname === '/rewrite-to-vercel') {
    return NextResponse.rewrite('https://vercel.com');
  }

  if (url.pathname === '/redirect-to-vercel') {
    return NextResponse.redirect('https://vercel.com');
  }

  if (url.pathname === '/json-response') {
    return new NextResponse(JSON.stringify({ message: 'hello world!' }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  if (url.pathname === '/stream-response') {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    const res = new NextResponse(readable);
    writer.write(encoder.encode('this is a streamed '));
    writer.write(encoder.encode('response '));
    writer.close();
    return res;
  }
  
  event.waitUntil(delayedLog())

  const response = NextResponse.next();
  response.headers.set('x-example', 'edge');
  return response;
}

async function delayedLog() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`This was logued after 2s`)
      resolve()
    }, 2000)
  }) 
}
