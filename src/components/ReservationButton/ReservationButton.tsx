import React from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import {
  selectDate,
  selectReservation,
  updateDaySlots,
  updateTimeSlots,
} from '@store/reservation';
import { getTables, selectTableId, setSelectedTable } from '@store/table';

const ReservationButton: React.VFC = () => {
  const dispatch = useDispatch();

  const date = useSelector(selectDate);

  const tableId = useSelector(selectTableId);
  const reservation = useSelector(selectReservation);

  const handleClick = async () => {
    if (reservation.days.length === 0) {
      await provider
        .put(
          '/reservation/addReservations',
          JSON.stringify({
            id: tableId,
            date: reservation.reservationDate,
            hours: reservation.hours,
          })
        )
        .finally(() => {
          dispatch(getTables(date!));
          dispatch(setSelectedTable(null));
          dispatch(updateTimeSlots(null));
          dispatch(updateDaySlots(null));
        });
    } else {
      await provider
        .put(
          '/reservation/addRegularReservations',
          JSON.stringify({
            id: tableId,
            days: reservation.days,
            hours: reservation.hours,
          })
        )
        .finally(() => {
          dispatch(getTables(date!));
          dispatch(updateTimeSlots(null));
          dispatch(updateDaySlots(null));
        });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'w-min block bg-white border-solid border-2 border-primary font-manrope text-primary rounded px-3 py-2 mt-auto transition-all',
        reservation.hours.length === 0
          ? 'border-gray-2 text-gray-2'
          : 'hover:bg-blue-3'
      )}
      disabled={reservation.hours.length === 0}
      whileTap={reservation.hours.length === 0 ? undefined : { scale: 0.95 }}
    >
      Забронировать
    </Button>
  );
};

export default ReservationButton;
