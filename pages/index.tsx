import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <h1>Demo</h1>
      <ul>
        <li>
          <Link href="/home">
            <a>A/B Testing</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/rewrite-me-to-about">
            <a>Rewrite to existing page</a>
          </Link>
        </li>
        <li>
          <Link href="/redirect-me-to-about">
            <a>Redirect to existing page</a>
          </Link>
        </li>
        <li>
          <Link href="/rewrite-to-vercel">
            <a>Rewrite to external site</a>
          </Link>
        </li>
        <li>
          <Link href="/redirect-to-vercel">
            <a>Redirect to external site</a>
          </Link>
        </li>
        <li>
          <Link href="/json-response">
            <a>Respond with JSON</a>
          </Link>
        </li>
        <li>
          <Link href="/stream-response">
            <a>Respond with Stream</a>
          </Link>
        </li>
        <li>
          <Link href="/dynamic/greet?greeting=hola">
            <a>Dynamic Nested Middleware</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
