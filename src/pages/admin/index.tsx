import React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { AppLoadingSpinner } from '@components/AppLoadingSpinner';
import { useAuth } from '@src/contexts';
import { UserModel } from '@src/models';
import { getUserServerSide } from '@src/utils';

const Index: NextPage<{ user: UserModel }> = ({ user }) => {
  const { isLoading } = useAuth();
  if (isLoading) return <AppLoadingSpinner />;
  if (user.role !== 'Admin') return <h1>Access denied</h1>;
  return <h1>Admin page should be here</h1>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserServerSide(ctx);

  if (user) {
    return { props: { user } as never };
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
