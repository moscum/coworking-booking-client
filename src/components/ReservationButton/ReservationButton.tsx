import React from 'react';

import axios from 'axios';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import { selectReservation, setDate } from '@store/reservation';
import { selectTableId } from '@store/table';

const ReservationButton: React.VFC = () => {
  const dispatch = useDispatch();

  const tableId = useSelector(selectTableId);
  const reservation = useSelector(selectReservation);

  const handleClick = async () => {
    await axios
      .request(
        await provider.put(
          '/reservation/addReservations',
          JSON.stringify({
            id: tableId,
            date: reservation.date,
            hours: reservation.hours,
          })
        )
      )
      .catch(() => dispatch(setDate(new Date().toISOString())));
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
