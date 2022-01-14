import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import SlotButton from '@components/SlotButton';
import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import {
  selectReservation,
  setReservationDate,
  updateTimeSlots,
} from '@store/reservation';
import { selectTable, selectTables } from '@store/table';

interface Props {
  reservations: Reservation[];
  date: string;
}

const TimePicker: React.VFC<Props> = ({ reservations, date }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('disabled');

  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const tables = useSelector(selectTables);
  const selectedTable = useSelector(selectTable);
  const reservation = useSelector(selectReservation);

  const handleClick = () => {
    if (reservation.reservationDate !== date) {
      updateTimeSlots({ time: Array.from({ length: 14 }, (_, i) => i + 8) });
      dispatch(setReservationDate(date));
    }
    if (status === 'selected') dispatch(updateTimeSlots({ time: null }));
    else
      dispatch(
        updateTimeSlots({ time: Array.from({ length: 14 }, (_, i) => i + 8) })
      );
  };

  useEffect(() => {
    if (!tables) setStatus('loading');
    else if (
      reservation.hours.length === 14 &&
      reservation.reservationDate === date
    )
      setStatus('selected');
    else if (selectedTable && reservations.length === 14) setStatus('busy');
    else if (!selectedTable || reservations.length !== 0) setStatus('disabled');
    else setStatus('free');
  }, [selectedTable, tables, reservation]);

  return (
    <div>
      <Button
        className={cn(
          'font-manrope text-lg px-2 py-0 mb-1 rounded text-xl transition-all',
          {
            'animate-shine cursor-wait text-transparent': status === 'loading',
            'bg-primary text-white': status === 'selected',
            'bg-gray-1 hover:bg-blue-3 text-black': status === 'free',
            'bg-gray-1 text-gray-2 cursor-default': status === 'disabled',
            'bg-accent text-white cursor-not-allowed': status === 'busy',
          }
        )}
        disabled={status !== 'free' && status !== 'selected'}
        whileTap={
          status !== 'free' && status !== 'selected'
            ? undefined
            : { scale: 0.95 }
        }
        onClick={handleClick}
      >
        Весь день
      </Button>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {tables
          ? hours.map((h, i) => (
              <SlotButton
                key={i}
                date={date}
                hour={h}
                reservations={reservations}
              />
            ))
          : hours.map((_p, i) => (
              <div
                key={i}
                className={'h-7 rounded animate-shine cursor-wait'}
              />
            ))}
      </div>
    </div>
  );
};

export default TimePicker;
