import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import SlotButton from '@components/SlotButton';
import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import {
  selectReservationState,
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
  const reservation = useSelector(selectReservationState);

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
    const time = new Date(date);
    time.setHours(8);
    if (reservation.hours.length === 14 && reservation.reservationDate === date)
      setStatus('selected');
    else if (
      !selectedTable ||
      (reservations.length > 0 && reservations.length < 14) ||
      new Date().getTime() > time.getTime()
    )
      setStatus('disabled');
    else if (selectedTable && reservations.length === 14) setStatus('busy');
    else setStatus('free');
  }, [selectedTable, tables, reservation, date]);

  return (
    <div className={'relative'}>
      <div
        className={cn('absolute right-0 -top-8 rounded', {
          'animate-shine cursor-wait': !tables,
        })}
      >
        <Button
          className={cn('font-manrope text-lg px-2 py-0 rounded text-xl', {
            invisible: !tables,
            'transition-all': tables,
            'bg-primary text-white': status === 'selected',
            'bg-gray-1 hover:bg-blue-3 text-black': status === 'free',
            'bg-gray-1 text-gray-2 cursor-default': status === 'disabled',
            'bg-accent text-white cursor-not-allowed': status === 'busy',
          })}
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
      </div>

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
