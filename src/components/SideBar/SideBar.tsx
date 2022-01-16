import React from 'react';

import DatePicker from '@components/DatePicker';
import OtherDaysPicker from '@components/OtherDaysPicker';
import RegularReservation from '@components/RegularReservation';
import ReservationButton from '@components/ReservationButton';
import TimePicker from '@components/TimePicker';
import { useSelector } from '@src/hooks';
import { selectDate } from '@store/reservation';
import { selectTable } from '@store/table';

const SideBar: React.VFC = () => {
  const selectedTable = useSelector(selectTable);
  const date = useSelector(selectDate);

  return (
    <div className={'bg-white flex-1 px-8 py-6 max-w-[540px] flex flex-col'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker
        date={date!}
        reservations={
          selectedTable?.reservations ? selectedTable.reservations : []
        }
      />
      <OtherDaysPicker />
      <RegularReservation />
      <ReservationButton />
    </div>
  );
};

export default SideBar;
