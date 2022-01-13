import React from 'react';

import SlotButton from '@components/SlotButton';
import { useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';
import { selectTables } from '@store/table';

const TimePicker: React.VFC = () => {
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const date = useSelector(selectDate);
  const tables = useSelector(selectTables);

  return (
    <div className="grid grid-cols-7 gap-1">
      {tables
        ? hours.map((h, i) => <SlotButton key={i} date={date!} hour={h} />)
        : hours.map((_p, i) => (
            <div key={i} className={'h-7 rounded animate-shine cursor-wait'} />
          ))}
    </div>
  );
};

export default TimePicker;
