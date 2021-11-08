import React from 'react';

import '@src/styles/global.scss';
import { AppProps } from 'next/app';

import { AuthProvider, TableProvider } from '@src/contexts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <TableProvider>
        <Component {...pageProps} />
      </TableProvider>
    </AuthProvider>
  );
};

export default MyApp;
