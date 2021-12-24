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
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState('disabled');
  const time = new Date(date);
  time.setHours(hour);

  const selectedTable = useSelector(selectTable);
  const tables = useSelector(selectTables);

  const dispatch = useDispatch();

  const handleClick = () => {
    setSelected(!selected);
    dispatch(updateTimeSlots(hour));
  };
  //
  // useEffect(() => {
  //
  // }, [selected]);

  useEffect(() => {
    if (!tables) setStatus('loading');
    else if (new Date().getTime() > time.getTime() || !selectedTable)
      setStatus('disabled');
    else if (
      date &&
      selectedTable &&
      selectedTable.reservations.find((r) => {
        console.log(new Date(r.date).getHours() + 19);
        return new Date(r.date).getHours() + 19 === hour;
      })
    ) {
      setStatus('busy');
    } else setStatus('free');
  }, [selectedTable, date, tables, selectedTable?.reservations]);

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
