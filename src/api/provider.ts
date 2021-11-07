import Axios from 'axios';

const urls = {
  test: `http://localhost:5000/api`,
  development: 'http://localhost:5000/api',
  production: '/api',
};

export const provider = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'development',
});
