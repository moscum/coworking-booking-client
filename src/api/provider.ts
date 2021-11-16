import Axios from 'axios';

const baseUrl = `http://localhost:5000/api`;

export const provider = Axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'development',
});
