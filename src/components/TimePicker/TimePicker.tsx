import React from 'react';

import SlotButton from '@components/SlotButton';
import { useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';
import { selectTable, selectTableReservations } from '@store/table';

const TimePicker: React.VFC = () => {
  const selectedTable = useSelector(selectTable);
  const tableReservations = useSelector(selectTableReservations(selectedTable));
  const hours: number[] = Array.from({ length: 14 }, (_, i) => 8 + i);
  const date = useSelector(selectDate);

  return (
    <div className="grid grid-cols-7 gap-1">
      {tableReservations &&
        date &&
        hours.map((h, i) => (
          <SlotButton
            key={i}
            reservations={tableReservations}
            date={date}
            hour={h}
          />
        ))}
    </div>
  );
};

export default TimePicker;
