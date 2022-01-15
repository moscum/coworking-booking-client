import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import SideBar from '@components/SideBar';
import TablesArea from '@components/TablesArea';
import UserMenu from '@components/UserMenu';
import { useDispatch, useSelector } from '@src/hooks';
import { getUser, selectUserState } from '@store/user';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector(selectUserState);
  const router = useRouter();
  useEffect(() => {
    if (!user) dispatch(getUser());
    if (!isLoggedIn && !isLoading) router.push('/login');
  }, [isLoggedIn, user, isLoading]);
  if (isLoading || !isLoggedIn) return <AppLoadingSpinner />;
  return (
    <div className={'h-screen flex'}>
      <SideBar />
      <div className={'flex justify-end align-top flex-2 relative px-8 py-6'}>
        <UserMenu />
        <TablesArea />
      </div>
    </div>
  );
};

export default Index;
