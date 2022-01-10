import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { updateTimeSlots } from '@store/reservation';
import { selectTable, selectTables } from '@store/table';

interface Props {
  date: string;
  hour: number;
}

const SlotButton: React.VFC<Props> = ({ hour, date }) => {
  const [status, setStatus] = useState('disabled');
  const time = new Date(date);
  time.setHours(hour);

  const selectedTable = useSelector(selectTable);
  const tables = useSelector(selectTables);

  const dispatch = useDispatch();

  const handleClick = () => {
    setStatus('selected');
    dispatch(updateTimeSlots(hour));
  };

  useEffect(() => {
    if (!tables) setStatus('loading');
    else if (new Date().getTime() > time.getTime() || !selectedTable)
      setStatus('disabled');
    else if (
      date &&
      selectedTable &&
      selectedTable.reservations.find((r) => {
        return new Date(r.date).getUTCHours() === hour;
      })
    ) {
      setStatus('busy');
    } else setStatus('free');
  }, [selectedTable, date, tables, selectedTable?.reservations]);

  return (
    <button
      className={cn('w-16 h-7 rounded text-xl', {
        'bg-primary text-white': status === 'selected',
        'bg-gray-1': status === 'free',
        'bg-gray-1 text-gray-2': status === 'disabled',
        'animate-shine text-transparent': status === 'loading',
        'bg-accent text-white': status === 'busy',
      })}
      disabled={status !== 'free'}
      onClick={handleClick}
    >
      {`${hour < 10 ? '0' : ''}${hour}:00`}
    </button>
  );
};

export default SlotButton;
