import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import { useDispatch, useSelector } from '@src/hooks';
import { User } from '@src/types';
import { getUser, selectUser } from '@store/user';

const Index: NextPage<{ user: User }> = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (!user) dispatch(getUser());
    if (user?.role !== 'Admin' && isLoggedIn && !isLoading) router.push('/');
  }, [isLoggedIn, user, isLoading]);
  if (isLoading || !isLoggedIn || user?.role !== 'Admin')
    return <AppLoadingSpinner />;
  return <h1>Admin page should be here</h1>;
};

export default Index;
