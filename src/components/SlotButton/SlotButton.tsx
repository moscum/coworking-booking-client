import React, { useEffect, useState } from 'react';

import { Button, Tooltip } from 'clcm';
import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { Reservation, User } from '@src/types';
import {
  selectReservationState,
  setReservationDate,
  updateTimeSlots,
} from '@store/reservation';
import { selectTable } from '@store/table';

interface Props {
  date: string;
  hour: number;
  reservations: Reservation[];
}

const SlotButton: React.VFC<Props> = ({ hour, date, reservations }) => {
  const [status, setStatus] = useState('disabled');
  const [user, setUser] = useState<User | null>(null);
  const reservationState = useSelector(selectReservationState);
  const selectedTable = useSelector(selectTable);
  const time = new Date(date);
  time.setHours(hour);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (reservationState.reservationDate !== date) {
      dispatch(updateTimeSlots(null));
      dispatch(setReservationDate(date));
    }
    dispatch(updateTimeSlots(hour));
  };

  useEffect(() => {
    const reservation = reservations.find((r) => {
      return new Date(r.date!).getUTCHours() === hour;
    });
    if (new Date().getTime() > time.getTime() || !selectedTable)
      setStatus('disabled');
    else if (
      reservationState.reservationDate === date &&
      reservationState.hours.includes(hour)
    )
      setStatus('selected');
    else if (date && reservation) {
      setStatus('busy');
      setUser(reservation.user);
    } else setStatus('free');
  }, [selectedTable, date, reservations, reservationState.hours]);

  return (
    <Tooltip
      className="bg-black/50 backdrop-blur-lg rounded text-white whitespace-nowrap bottom-9 select-none"
      position="top"
      disabled={!user}
      content={`${user?.firstName} ${user?.lastName}`}
    >
      <Button
        className={cn(
          'font-manrope text-lg w-full p-0 rounded text-xl transition-all',
          {
            'bg-primary text-white': status === 'selected',
            'bg-gray-1 hover:bg-blue-3 text-black': status === 'free',
            'bg-gray-1 text-gray-2 cursor-default': status === 'disabled',
            'bg-accent text-white cursor-default': status === 'busy',
          }
        )}
        whileTap={
          status !== 'free' && status !== 'selected'
            ? undefined
            : { scale: 0.95 }
        }
        onClick={
          status === 'free' || status === 'selected' ? handleClick : undefined
        }
      >
        {`${hour < 10 ? '0' : ''}${hour}:00`}
      </Button>
    </Tooltip>
  );
};

export default SlotButton;
