import React from 'react';

import cn from 'clsx';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import {
  selectDate,
  selectReservation,
  updateTimeSlots,
} from '@store/reservation';
import { getTables, selectTableId } from '@store/table';

const ReservationButton: React.VFC = () => {
  const dispatch = useDispatch();

  const date = useSelector(selectDate);

  const tableId = useSelector(selectTableId);
  const reservation = useSelector(selectReservation);

  const handleClick = async () => {
    await provider
      .put(
        '/reservation/addReservations',
        JSON.stringify({
          id: tableId,
          date: reservation.date,
          hours: reservation.hours,
        })
      )
      .finally(() => {
        dispatch(getTables(date!));
        dispatch(updateTimeSlots(null));
      });
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-min block border-2 border-primary  text-primary rounded px-3 py-2 mt-auto transition-all ',
        reservation.hours.length === 0
          ? 'border-gray-2 text-gray-2 cursor-not-allowed'
          : 'hover:bg-blue-3'
      )}
      disabled={reservation.hours.length === 0}
    >
      Забронировать
    </button>
  );
};

export default ReservationButton;
