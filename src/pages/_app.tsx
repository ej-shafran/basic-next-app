import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default ({ Component, pageProps: { session, ...rest } }: AppProps) => (
  <SessionProvider session={session}>
    <Component {...rest} />
  </SessionProvider>
);
