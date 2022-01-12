import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import DatePicker from '@components/DatePicker';
import User from '@components/User';
import { useDispatch, useSelector } from '@src/hooks';
import { getReservations, getUser, selectUserState } from '@store/user';

const Reservations: NextPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading, user } = useSelector(selectUserState);
  const router = useRouter();

  useEffect(() => {
    if (!user) dispatch(getUser());
    if (!isLoggedIn && !isLoading) router.push('/login');
  }, [isLoggedIn, user, isLoading]);

  if (isLoading || !isLoggedIn) return <AppLoadingSpinner />;

  return (
    <div className={'h-screen px-8 py-6'}>
      <div className={'flex justify-between items-start w-full'}>
        <h1 className={'text-4xl'}>История бронирований</h1>
        <User />
      </div>
      <div className={'flex justify-between items-start w-full'}>
        <div className={'flex flex-col flex-1'}>
          <DatePicker />
          <button onClick={() => dispatch(getReservations(user?.id!))}>
            123213
          </button>
        </div>
        <div className={'flex flex-col flex-1'}>
          <p className={'text-primary text-xl'}>Регулярные бронирования</p>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
