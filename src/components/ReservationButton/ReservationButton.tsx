import React from 'react';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import { selectDate, selectReservation } from '@store/reservation';
import { getReservations, selectTableId } from '@store/table';

const ReservationButton: React.VFC = () => {
  const dispatch = useDispatch();

  const date = useSelector(selectDate);

  const tableId = useSelector(selectTableId);
  const reservation = useSelector(selectReservation);

  const handleClick = async () => {
    await provider
      .put(
        '/reservation/addReservations',
        JSON.stringify({
          id: tableId,
          date: reservation.date,
          hours: reservation.hours,
        })
      )
      .finally(() => dispatch(getReservations(date!)));
  };
  return (
    <button
      onClick={handleClick}
      className="block border-2 border-primary text-primary rounded px-1 py-1 my-2"
    >
      Забронировать
    </button>
  );
};

export default ReservationButton;
