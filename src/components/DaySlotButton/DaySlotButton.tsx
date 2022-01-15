import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { selectReservationState, updateDaySlots } from '@store/reservation';
import { selectTable } from '@store/table';

interface Props {
  day: number;
}

const DaySlotButton: React.VFC<Props> = ({ day }) => {
  const dispatch = useDispatch();

  const reservationState = useSelector(selectReservationState);
  const selectedTable = useSelector(selectTable);

  const [status, setStatus] = useState('disabled');

  const dayOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  const handleClick = () => {
    dispatch(updateDaySlots(day));
  };

  useEffect(() => {
    if (reservationState.days.includes(day)) setStatus('selected');
    else if (!selectedTable) setStatus('disabled');
    else setStatus('free');
  }, [selectedTable, reservationState.days]);

  return (
    <Button
      className={cn('font-manrope text-lg p-0 rounded text-xl transition-all', {
        'bg-primary text-white': status === 'selected',
        'bg-gray-1 hover:bg-blue-3 text-black': status === 'free',
        'bg-gray-1 text-gray-2 cursor-default': status === 'disabled',
      })}
      onClick={handleClick}
    >
      {dayOfWeek[day]}
    </Button>
  );
};

export default DaySlotButton;
