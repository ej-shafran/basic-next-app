import "filter-and-map";
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';

export default ({ Component, pageProps: { session, ...rest } }: AppProps) => (
  <SessionProvider session={session}>
    <Component {...rest} />
    <Link href="/">Back to home</Link>
  </SessionProvider>
);
