import React from 'react';

import '@src/styles/global.scss';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
