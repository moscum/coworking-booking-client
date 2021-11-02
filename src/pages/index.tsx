import React from 'react';

import { GetServerSideProps } from 'next';

import { UserLayout } from '@components/UserLayout';
import { getUserServerSide } from '@src/utils';

const Index: React.FC = () => {
  return <UserLayout />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserServerSide(ctx);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {} as never,
    };
  }
  return { props: {} as never };
};

export default Index;
