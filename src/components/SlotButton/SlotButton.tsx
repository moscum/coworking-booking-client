import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { Reservation } from '@src/types';

interface Props {
  reservations: Reservation[];
  date: string;
  hour: number;
}

const SlotButton: React.VFC<Props> = ({ reservations, hour, date }) => {
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState('free');

  const handleClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    if (new Date().getTime() > new Date(date).setHours(hour))
      setStatus('disabled');
    else if (reservations.find((r) => new Date(r.date).getHours() === hour))
      setStatus('busy');
  }, []);

  return (
    <button
      className={cn(
        'w-16 h-7 rounded text-xl',
        {
          'bg-primary text-white': selected,
          'bg-gray-1': !selected && status === 'free',
          'bg-gray-1 text-gray-2': status === 'disabled',
          'bg-accent text-white': status === 'busy',
        }
        // slot.free ? 'bg-gray-1' : 'bg-gray-1 text-gray-2',
        // slot.busy && 'bg-accent text-white'
      )}
      disabled={status !== 'free'}
      onClick={handleClick}
    >
      {`${hour < 10 ? '0' : ''}${hour}:00`}
    </button>
  );
};

export default SlotButton;
