import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import AppLoadingSpinner from '@components/AppLoadingSpinner';
import DatePicker from '@components/DatePicker';
import ReservationCard from '@components/ReservationCard';
import UserMenu from '@components/UserMenu';
import { useDispatch, useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';
import {
  getRegularReservations,
  getReservations,
  getUser,
  selectUserState,
} from '@store/user';

const History: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const date = useSelector(selectDate);
  const { isLoggedIn, isLoading, user, reservations, regularReservations } =
    useSelector(selectUserState);

  useEffect(() => {
    dispatch(getReservations(date!));
  }, [date]);

  useEffect(() => {
    dispatch(getRegularReservations());
  }, []);

  useEffect(() => {
    if (!user) dispatch(getUser());
    if (!isLoggedIn && !isLoading) router.push('/login');
  }, [isLoggedIn, user, isLoading]);

  if (isLoading || !isLoggedIn) return <AppLoadingSpinner />;

  return (
    <div className={'h-screen px-8 py-6 select-none'}>
      <div className={'flex justify-between items-start w-full'}>
        <h1 className={'text-4xl'}>История бронирований</h1>
        <UserMenu />
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
            <p className={'font-inter'}>У вас нет бронирований на этот день</p>
          )}
        </div>
        <div>
          <p className={'text-primary text-xl mb-2'}>Регулярные бронирования</p>
          {regularReservations
            ? regularReservations.map((r) => (
                <ReservationCard
                  key={r.id}
                  className={'bg-blue-3'}
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
          {regularReservations?.length === 0 && (
            <p className={'font-inter'}>У вас нет регулярных бронирований</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
