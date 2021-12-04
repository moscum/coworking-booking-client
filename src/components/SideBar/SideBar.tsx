import React from 'react';

import { DatePicker } from '@components/DatePicker';
import { DifferentDatePicker } from '@components/DifferentDatePicker';
import { useReservation } from '@src/contexts';
import { useAuth } from '@src/contexts/auth';

export const SideBar: React.FC = () => {
  const { logout } = useAuth();
  const { selectedTable, reservations } = useReservation();

  return (
    <div className={'bg-white flex-1 p-8 py-6'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable?.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <p>
        Reservation start:{' '}
        {reservations &&
          reservations.map((i) => (
            <span key={i.id}>{`${i.reservationStart}`}</span>
          ))}
      </p>
      <p>
        Reservation end:{' '}
        {reservations &&
          reservations.map((i) => (
            <span key={i.id}>{`${i.reservationEnd}`}</span>
          ))}
      </p>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <DifferentDatePicker />
    </div>
  );
};
