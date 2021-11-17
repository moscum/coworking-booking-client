import React from 'react';

import '@src/styles/global.scss';
import { AppProps } from 'next/app';

import { AuthProvider, ReservationProvider } from '@src/contexts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ReservationProvider>
        <Component {...pageProps} />
      </ReservationProvider>
    </AuthProvider>
  );
};

export default MyApp;
