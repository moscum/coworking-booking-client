import React from 'react';

import DatePicker from '@components/DatePicker';
import ReservationButton from '@components/ReservationButton';
import TimePicker from '@components/TimePicker';
import { useSelector } from '@src/hooks';
import { selectTable } from '@store/table';

const SideBar: React.VFC = () => {
  const selectedTable = useSelector(selectTable);

  return (
    <div className={'bg-white flex-1 px-8 py-6 max-w-[540px] flex flex-col'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker />
      <ReservationButton />
    </div>
  );
};

export default SideBar;
