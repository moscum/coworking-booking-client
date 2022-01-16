import React from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import {
  selectDate,
  selectReservationState,
  updateDaySlots,
  updateTimeSlots,
} from '@store/reservation';
import { getTables, selectTableId, setSelectedTable } from '@store/table';

const ReservationButton: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const tableId = useSelector(selectTableId);
  const reservationState = useSelector(selectReservationState);

  // const { sendNotification } = useNotifications();

  const handleClick = async () => {
    if (reservationState.days.length === 0) {
      await provider
        .put(
          '/reservation/addReservations',
          JSON.stringify({
            id: tableId,
            date: reservationState.reservationDate,
            hours: reservationState.hours,
          })
        )
        .then(() => {
          // sendNotification(<span>Бронирование создано</span>, 'success', 2.5, {
          //   onClose: undefined,
          // });
        })
        .finally(() => {
          if (date) {
            dispatch(getTables(date));
            dispatch(setSelectedTable(null));
            dispatch(updateTimeSlots({ time: null }));
            dispatch(updateDaySlots(null));
          }
        })
        .catch(() => {
          // sendNotification(<span>Ошибка</span>, 'danger', 2.5, {
          //   onClose: undefined,
          // });
        });
    } else {
      await provider
        .put(
          '/reservation/addRegularReservations',
          JSON.stringify({
            id: tableId,
            days: reservationState.days,
            hours: reservationState.hours,
          })
        )
        .then(() => {
          // sendNotification(<span>Бронирование создано</span>, 'success', 2.5, {
          //   onClose: undefined,
          // });
        })
        .finally(() => {
          if (date) {
            dispatch(getTables(date));
            dispatch(updateTimeSlots({ time: null }));
            dispatch(updateDaySlots(null));
          }
        })
        .catch(() => {
          // sendNotification(<span>Ошибка</span>, 'danger', 2.5, {
          //   onClose: undefined,
          // });
        });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'w-min block bg-white border-solid border-2 border-primary font-manrope text-primary rounded px-3 py-2 mt-auto transition-all',
        reservationState.hours.length === 0
          ? 'border-gray-2 text-gray-2'
          : 'hover:bg-blue-3'
      )}
      disabled={reservationState.hours.length === 0}
      whileTap={
        reservationState.hours.length === 0 ? undefined : { scale: 0.95 }
      }
    >
      Забронировать
    </Button>
  );
};

export default ReservationButton;
