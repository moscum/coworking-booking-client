import React from 'react';

import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const router = useRouter();
  async function login() {
    const body = {
      login: 'test@example.com',
      password: 'test',
    };
    await axios.post('/security/login', JSON.stringify(body)).catch((error) => {
      throw new Error(error);
    });
  }

  async function logout() {
    await axios.post('/security/logout').catch((error) => {
      throw new Error(error);
    });
  }

  return (
    <div className="login">
      <button onClick={login}>Login</button>
      <br />
      <button onClick={logout}>Logout</button>
      <br />
      <button onClick={() => router.push('/')}>Tables</button>
    </div>
  );
};

export default Login;
