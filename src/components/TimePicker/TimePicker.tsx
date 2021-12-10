import React from 'react';

import SlotButton from '@components/SlotButton';
import { useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';

const TimePicker: React.VFC = () => {
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const date = useSelector(selectDate);

  return (
    <div className="grid grid-cols-7 gap-1">
      {date && hours.map((h, i) => <SlotButton key={i} date={date} hour={h} />)}
    </div>
  );
};

export default TimePicker;
