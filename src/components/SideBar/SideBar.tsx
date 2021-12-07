import React from 'react';

import { DatePicker } from '@components/DatePicker';
import { SlotButton } from '@components/SlotButton/SlotButton';
import { useDispatch, useSelector } from '@src/hooks';
import { selectTables } from '@store/table';
import { logout } from '@store/user';

export const SideBar: React.VFC = () => {
  const dispatch = useDispatch();
  const { selectedTable } = useSelector(selectTables);

  return (
    <div className={'bg-white flex-1 p-8 py-6'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable?.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <SlotButton time={new Date()} selected />
      <div>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};
