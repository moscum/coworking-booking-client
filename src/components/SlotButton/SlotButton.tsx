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
    if (status === 'selected') {
      setStatus('free');
    } else {
      setStatus('selected');
    }
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
      className={cn('w-16 h-7 rounded text-xl transition-all', {
        'bg-primary text-white': status === 'selected',
        'bg-gray-1 hover:bg-blue-3': status === 'free',
        'bg-gray-1 text-gray-2 cursor-not-allowed': status === 'disabled',
        'animate-shine text-transparent cursor-wait': status === 'loading',
        'bg-accent text-white cursor-not-allowed': status === 'busy',
      })}
      disabled={status !== 'free' && status !== 'selected'}
      onClick={handleClick}
    >
      {`${hour < 10 ? '0' : ''}${hour}:00`}
    </button>
  );
};

export default SlotButton;
