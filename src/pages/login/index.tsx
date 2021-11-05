import React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { AuthForm } from '@components/AuthForm/AuthForm';
import { getUserServerSide } from '@src/utils';

const Login: NextPage = () => {
  return (
    <div className={'flex flex-col items-center justify-center h-screen'}>
      <AuthForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserServerSide(ctx);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {} as never,
    };
  }

  return {
    props: {} as never,
  };
};

export default Login;
