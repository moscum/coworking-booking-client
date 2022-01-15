import React, { useEffect, useState } from 'react';

import { Button, Tooltip } from 'clcm';
import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import {
  selectReservationState,
  setReservationDate,
  updateTimeSlots,
} from '@store/reservation';
import { selectTable, selectOtherDayTables } from '@store/table';

interface Props {
  date: string;
  hour: number;
  reservations: Reservation[];
}

const SlotButton: React.VFC<Props> = ({ hour, date, reservations }) => {
  const [status, setStatus] = useState('disabled');
  const reservationState = useSelector(selectReservationState);
  const time = new Date(date);
  const timeString = time.toLocaleDateString('sv');
  time.setHours(hour);

  const selectedTable = useSelector(selectTable);
  const tableId = selectedTable?.id;
  const otherDayTables = useSelector(selectOtherDayTables);
  const NextDay = otherDayTables[1]?.date;
  const NextDay2 = otherDayTables[2]?.date;
  const NextDay3 = otherDayTables[3]?.date;

  let ind: number;

  if (hour < 10 && date === NextDay) {
    ind = otherDayTables[1]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay}T0${hour}:00:00Z`
    ) as number;
  } else if (hour < 10 && date === NextDay2) {
    ind = otherDayTables[2]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay2}T0${hour}:00:00Z`
    ) as number;
  } else if (hour < 10 && date === NextDay3) {
    ind = otherDayTables[3]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay3}T0${hour}:00:00Z`
    ) as number;
  } else if (hour < 10 && date === timeString) {
    ind = selectedTable?.reservations.findIndex(
      (x) => x.date === `${date}T0${hour}:00:00Z`
    ) as number;
  } else if (date === NextDay) {
    ind = otherDayTables[1]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay}T${hour}:00:00Z`
    ) as number;
  } else if (date === NextDay2) {
    ind = otherDayTables[2]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay2}T${hour}:00:00Z`
    ) as number;
  } else if (date === NextDay3) {
    ind = otherDayTables[3]?.tables[tableId!]?.findIndex(
      (x) => x.date === `${NextDay3}T${hour}:00:00Z`
    ) as number;
  } else if (date === timeString) {
    ind = selectedTable?.reservations.findIndex(
      (x) => x.date === `${date}T${hour}:00:00Z`
    ) as number;
  }

  let abc;
  if (reservations) {
    if (date === NextDay) {
      abc = `${reservations[ind!]?.user.firstName} ${
        reservations[ind!]?.user.lastName
      }`;
    } else if (date === NextDay2) {
      abc = `${reservations[ind!]?.user.firstName} ${
        reservations[ind!]?.user.lastName
      }`;
    } else if (date === NextDay3) {
      abc = `${reservations[ind!]?.user.firstName} ${
        reservations[ind!]?.user.lastName
      }`;
    } else if (date === timeString) {
      abc = `${selectedTable?.reservations[ind!]?.user.firstName} ${
        selectedTable?.reservations[ind!]?.user.lastName
      }`;
    }
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    if (reservationState.reservationDate !== date) {
      dispatch(updateTimeSlots(null));
      dispatch(setReservationDate(date));
    }
    dispatch(updateTimeSlots(hour));
  };

  useEffect(() => {
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
    } else setStatus('free');
  }, [
    selectedTable,
    date,
    selectedTable?.reservations,
    reservationState.hours,
  ]);

  return (
    <Tooltip
      className="bg-gray-1 text-black whitespace-nowrap"
      position="top"
      disabled={status !== 'busy'}
      content={abc}
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
  );
};

export default SlotButton;
