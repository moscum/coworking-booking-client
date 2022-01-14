import React from 'react';

import SlotButton from '@components/SlotButton';
import { useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import { selectTables } from '@store/table';

interface Props {
  reservations: Reservation[];
  date: string;
}

const TimePicker: React.VFC<Props> = ({ reservations, date }) => {
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const tables = useSelector(selectTables);

  return (
    <div className="grid grid-cols-7 gap-1 mb-3">
      {tables
        ? hours.map((h, i) => (
            <SlotButton
              key={i}
              date={date}
              hour={h}
              reservations={reservations}
            />
          ))
        : hours.map((_p, i) => (
            <div key={i} className={'h-7 rounded animate-shine cursor-wait'} />
          ))}
    </div>
  );
};

export default TimePicker;
