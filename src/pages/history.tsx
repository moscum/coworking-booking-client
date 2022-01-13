import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import DatePicker from '@components/DatePicker';
import ReservationCard from '@components/ReservationCard';
import User from '@components/User';
import { useDispatch, useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';
import { getReservations, getUser, selectUserState } from '@store/user';

const History: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const date = useSelector(selectDate);
  const { isLoggedIn, isLoading, user, reservations } =
    useSelector(selectUserState);

  useEffect(() => {
    dispatch(getReservations(date!));
  }, [date]);

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
      <div className={'grid grid-cols-2 gap-8 w-full'}>
        <div>
          <DatePicker />
          {reservations
            ? reservations.map((r) => (
                <ReservationCard
                  key={r.id}
                  className={'bg-gray-1'}
                  tableId={r.tableId}
                  reservation={r}
                />
              ))
            : Array.from({ length: 3 }).map((_p, i) => (
                <div
                  key={i}
                  className="w-full h-24 rounded-2xl py-4 px-6 mb-4 animate-shine"
                />
              ))}
          {reservations?.length === 0 && (
            <p className={'font-inter'}>У вас нет бронирований в этот день</p>
          )}
        </div>
        <div>
          <p className={'text-primary text-xl'}>Регулярные бронирования</p>
        </div>
      </div>
    </div>
  );
};

export default History;
