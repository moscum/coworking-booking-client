import React from 'react';

import '@src/styles/global.scss';
import axios from 'axios';
import { AppProps } from 'next/app';

axios.defaults.baseURL = 'https://coworking-booking.herokuapp.com/api';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
