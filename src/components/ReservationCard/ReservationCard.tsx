import React from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import TableButton from '@components/TableButton';
import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import { getDateString } from '@src/utils';
import { selectDate } from '@store/reservation';
import { getReservations } from '@store/user';

interface Props {
  className: string;
  tableId: number;
  reservation: Reservation;
}

const ReservationCard: React.VFC<Props> = ({
  className,
  tableId,
  reservation,
}) => {
  const time = new Date(reservation.date);
  const timeDiff = time.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(time.valueOf() + timeDiff);
  const isFinished = new Date().getTime() > adjustedDate.getTime();

  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const handleClick = async () => {
    await provider.delete(`/reservation/${reservation.id}`);
    dispatch(getReservations(date!));
  };

  return (
    <div className={cn('w-full flex rounded-2xl py-4 px-6 mb-4', className)}>
      <TableButton id={tableId} reservations={[reservation]} disabled />
      <div className={'ml-6 flex-1'}>
        <p className={'text-3xl'}>
          {new Date(reservation.date).getUTCHours()}:00
        </p>
        <p className={'text-xl'}>{getDateString(adjustedDate)}</p>
      </div>
      <Button
        onClick={handleClick}
        className={cn(
          'w-min block bg-white border-2 border-solid font-manrope  rounded px-3 py-2 mt-auto transition-all',
          isFinished
            ? 'border-gray-2 text-gray-2'
            : 'border-primary text-primary hover:bg-blue-3'
        )}
        disabled={isFinished}
        whileTap={isFinished ? undefined : { scale: 0.95 }}
      >
        {isFinished ? 'Окончено' : 'Отменить'}
      </Button>
    </div>
  );
};

export default ReservationCard;
