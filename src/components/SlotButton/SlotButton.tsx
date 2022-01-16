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
  const [currentSlot, setCurrentSlot] = useState<User | null>(null);
  const reservationState = useSelector(selectReservationState);
  const selectedTable = useSelector(selectTable);
  const time = new Date(date);
  time.setHours(hour);
  // let index;

  // if (reservations) {
  //   index = reservations.find((r) => {
  //     return new Date(r.date!).getUTCHours() === hour;
  //   });
  //   console.log(
  //     index?.user.firstName,
  //     index?.user.lastName,
  //     index?.date,
  //     index?.hour,
  //     index?.tableId
  //   );
  // }

  const dispatch = useDispatch();

  const handleClick = () => {
    if (reservationState.reservationDate !== date) {
      dispatch(updateTimeSlots(null));
      dispatch(setReservationDate(date));
    }
    dispatch(updateTimeSlots(hour));
  };

  useEffect(() => {
    let abc: User | null;
    if (reservations) {
      abc = reservations.find((r) => {
        return new Date(r.date!).getUTCHours() === hour;
      })?.user!;
    }
    if (new Date().getTime() > time.getTime() || !selectedTable)
      setStatus('disabled');
    else if (
      reservationState.reservationDate === date &&
      reservationState.hours.includes(hour)
    )
      setStatus('selected');
    else if (
      date &&
      reservations &&
      reservations.find((r) => {
        return new Date(r.date!).getUTCHours() === hour;
      })
    ) {
      setStatus('busy');
      setCurrentSlot(abc!);
    } else setStatus('free');
  }, [
    selectedTable,
    date,
    selectedTable?.reservations,
    reservationState.hours,
  ]);

  return (
    <div className="group">
      <Tooltip
        className="invisible group-hover:visible bg-gray-1 text-black whitespace-nowrap"
        position="top"
        disabled={!currentSlot}
        content={`${currentSlot?.firstName} ${currentSlot?.lastName}`}
      >
        <Button
          className={cn(
            'font-manrope text-lg w-14 p-0 rounded text-xl transition-all',
            {
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
          {`${hour < 10 ? '0' : ''}${hour}:00`}
        </Button>
      </Tooltip>
    </div>
  );
};

export default SlotButton;
