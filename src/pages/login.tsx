import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import AuthForm from '@components/AuthForm';
import { useDispatch, useSelector } from '@src/hooks';
import { getUser, selectUserState } from '@store/user';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector(selectUserState);
  const router = useRouter();
  useEffect(() => {
    if (!user) dispatch(getUser());
    if (isLoggedIn && !isLoading) router.replace('/');
  }, [isLoggedIn, user]);
  if (isLoading || isLoggedIn) return <AppLoadingSpinner />;
  return (
    <div
      className={
        'flex flex-col items-center justify-center h-screen select-none'
      }
    >
      <AuthForm />
    </div>
  );
};

export default Login;
