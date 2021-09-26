import React from 'react';

import { AppProps } from 'next/app';
import '@src/styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
