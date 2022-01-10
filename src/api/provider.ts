import Axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development' ? `http://localhost:5000/api` : '/api';

export const provider = Axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
