import React from 'react';

import '@src/styles/global.scss';
import axios from 'axios';
import { AppProps } from 'next/app';

axios.defaults.baseURL = 'https://localhost:5001/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
