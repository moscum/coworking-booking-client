import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import SideBar from '@components/SideBar';
import TablesArea from '@components/TablesArea';
import { useDispatch, useSelector } from '@src/hooks';
import { getUser, selectUser } from '@store/user';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (!user) dispatch(getUser());
    if (!isLoggedIn && !isLoading) router.push('/login');
  }, [isLoggedIn, user, isLoading]);
  if (isLoading || !isLoggedIn) return <AppLoadingSpinner />;
  return (
    <div className={'bg-white h-screen flex'}>
      <SideBar />
      <TablesArea />
    </div>
  );
};

export default Index;
