import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import { useDispatch, useSelector } from '@src/hooks';
import { User } from '@src/types';
import { getUser, selectUserState } from '@store/user';

const Admin: NextPage<{ user: User }> = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector(selectUserState);
  const router = useRouter();
  useEffect(() => {
    if (!user) dispatch(getUser());
    if (user?.role !== 'Admin' && isLoggedIn && !isLoading) router.push('/');
  }, [isLoggedIn, user, isLoading]);
  if (isLoading || !isLoggedIn || user?.role !== 'Admin')
    return <AppLoadingSpinner />;
  return <h1>Admin page should be here</h1>;
};

export default Admin;
