import React from 'react';

import DatePicker from '@components/DatePicker';
import ReservationButton from '@components/ReservationButton';
import TimePicker from '@components/TimePicker';
import { useDispatch, useSelector } from '@src/hooks';
import { logout } from '@store/auth';
import { selectTable } from '@store/table';

const SideBar: React.VFC = () => {
  const dispatch = useDispatch();
  const selectedTable = useSelector(selectTable);

  return (
    <div className={'bg-white flex-1 p-8 py-6 max-w-[540px] flex flex-col'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker />
      <div className={'mt-auto'}>
        <ReservationButton />
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
