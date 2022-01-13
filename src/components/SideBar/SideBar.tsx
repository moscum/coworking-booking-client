import React from 'react';

import DatePicker from '@components/DatePicker';
import ReservationButton from '@components/ReservationButton';
import ThreeDaysPicker from '@components/ThreeDaysPicker';
import TimePicker from '@components/TimePicker';
import { useSelector } from '@src/hooks';
import { selectDate } from '@src/store/reservation';
import { selectTable } from '@store/table';

const SideBar: React.VFC = () => {
  const date = useSelector(selectDate) as string;
  const selectedTable = useSelector(selectTable);

  return (
    <div className={'bg-white flex-1 px-8 py-6 max-w-[540px] flex flex-col'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker Date={date} />
      <ThreeDaysPicker />
      <ReservationButton />
    </div>
  );
};

export default SideBar;
