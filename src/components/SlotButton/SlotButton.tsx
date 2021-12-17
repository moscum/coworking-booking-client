import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useSelector } from '@src/hooks';
import { selectTable, selectTables } from '@store/table';

interface Props {
  date: string;
  hour: number;
}

const SlotButton: React.VFC<Props> = ({ hour, date }) => {
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState('disabled');
  const selectedTable = useSelector(selectTable);
  const tables = useSelector(selectTables);

  const handleClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    if (!tables) setStatus('loading');
    else if (
      new Date().getTime() > new Date(date).setHours(hour) ||
      !selectedTable
    )
      setStatus('disabled');
    else if (
      date &&
      selectedTable &&
      selectedTable.reservations.find(
        (r) => new Date(r.date).getHours() === hour
      )
    ) {
      setStatus('busy');
    } else setStatus('free');
  }, [selectedTable, date, tables]);

  return (
    <button
      className={cn('w-16 h-7 rounded text-xl', {
        'bg-primary text-white': selected,
        'bg-gray-1': !selected && status === 'free',
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
