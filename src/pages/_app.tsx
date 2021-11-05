import React from 'react';

import '@src/styles/global.scss';
import { AppProps } from 'next/app';

import { AuthProvider } from '@src/contexts/auth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
