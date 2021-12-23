import React, { useEffect } from 'react';

import SlotButton from '@components/SlotButton';
// import { useSelector } from '@src/hooks';
// import { selectDate } from '@store/reservation';
import { useDispatch } from '@src/hooks';
import { getReservations } from '@store/table';

interface Date {
  Date: string;
}

const TimePicker: React.VFC<Date> = ({ Date }) => {
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  // const date = useSelector(selectDate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations(Date));
  }, [Date]);

  return (
    <div className="grid grid-cols-7 gap-1">
      {Date && hours.map((h, i) => <SlotButton key={i} date={Date} hour={h} />)}
    </div>
  );
};

export default TimePicker;
