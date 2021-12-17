import React from 'react';

import DatePicker from '@components/DatePicker';
import ThreeDaysPicker from '@components/ThreeDaysPicker';
import TimePicker from '@components/TimePicker';
import { useDispatch, useSelector } from '@src/hooks';
import { selectTable } from '@store/table';
import { logout } from '@store/user';

const SideBar: React.VFC = () => {
  const dispatch = useDispatch();
  const selectedTable = useSelector(selectTable);

  return (
    <div className={'bg-white flex-1 p-8 py-6 max-w-[540px]'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker />
      <ThreeDaysPicker />
      <div>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
