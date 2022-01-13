import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { updateTimeSlots } from '@store/reservation';
import { selectTable } from '@store/table';

interface Props {
  date: string;
  hour: number;
}

const SlotButton: React.VFC<Props> = ({ hour, date }) => {
  const [status, setStatus] = useState('disabled');
  const time = new Date(date);
  time.setHours(hour);

  const selectedTable = useSelector(selectTable);

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
    if (new Date().getTime() > time.getTime() || !selectedTable)
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
  }, [selectedTable, date, selectedTable?.reservations]);

  return (
    <Button
      className={cn('font-manrope text-lg p-0 rounded text-xl transition-all', {
        'bg-primary text-white': status === 'selected',
        'bg-gray-1 hover:bg-blue-3 text-black': status === 'free',
        'bg-gray-1 text-gray-2 cursor-default': status === 'disabled',
        'bg-accent text-white cursor-not-allowed': status === 'busy',
      })}
      disabled={status !== 'free' && status !== 'selected'}
      whileTap={
        status !== 'free' && status !== 'selected' ? undefined : { scale: 0.95 }
      }
      onClick={handleClick}
    >
      {`${hour < 10 ? '0' : ''}${hour}:00`}
    </Button>
  );
};

export default SlotButton;
