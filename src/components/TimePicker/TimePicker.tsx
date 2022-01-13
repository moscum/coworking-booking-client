import React, { useEffect } from 'react';

import SlotButton from '@components/SlotButton';
import { useDispatch } from '@src/hooks';
import { getTables } from '@store/table';

interface Props {
  date: string;
}

const TimePicker: React.VFC<Props> = ({ date }) => {
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables(date));
  }, [date]);

  return (
    <div className="grid grid-cols-7 gap-1">
      {date && hours.map((h, i) => <SlotButton key={i} date={date} hour={h} />)}
    </div>
  );
};

export default TimePicker;
