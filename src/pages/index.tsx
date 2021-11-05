import React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { AppLoadingSpinner } from '@components/AppLoadingSpinner';
import { UserLayout } from '@components/UserLayout';
import { useAuth } from '@src/contexts/auth';
import { getUserServerSide } from '@src/utils';

const Index: NextPage = () => {
  const { isLoading } = useAuth();
  if (isLoading) return <AppLoadingSpinner />;
  return <UserLayout />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserServerSide(ctx);

  if (user) {
    return { props: {} as never };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: {} as never,
  };
};

export default Index;
