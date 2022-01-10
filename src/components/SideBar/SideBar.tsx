import React from 'react';

import DatePicker from '@components/DatePicker';
import ReservationButton from '@components/ReservationButton';
import ThreeDaysPicker from '@components/ThreeDaysPicker';
import TimePicker from '@components/TimePicker';
import { useDispatch, useSelector } from '@src/hooks';
import { selectDate } from '@src/store/reservation';
import { logout } from '@store/auth';
import { selectTable } from '@store/table';

const SideBar: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate) as string;
  const selectedTable = useSelector(selectTable);

  return (
    <div className={'bg-white flex-1 p-8 py-6 max-w-[540px] flex flex-col'}>
      <h1 className={'text-4xl'}>
        {selectedTable ? `Стол №${selectedTable.id}` : 'Выберите стол'}
      </h1>
      <DatePicker />
      <TimePicker Date={date} />
      <ThreeDaysPicker />
      <div className={'mt-auto'}>
        <ReservationButton />
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
