import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { useAuth } from '@src/contexts/auth';

const Login: NextPage = () => {
  const { isLoading, login, logout, user, isAuthenticated } = useAuth();

  if (isLoading) return <h1>LOADING...</h1>;
  return (
    <div className="login">
      <button onClick={login}>Login</button>
      <br />
      <button onClick={logout}>Logout</button>
      <br />
      <Link href="/">Tables</Link>
      <br />
      <button onClick={() => console.log(isLoading, isAuthenticated, user)}>
        User
      </button>
    </div>
  );
};

export default Login;
