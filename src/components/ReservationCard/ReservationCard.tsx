import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import TableButton from '@components/TableButton';
import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import { getDateString } from '@src/utils';
import { selectDate } from '@store/reservation';
import { getRegularReservations, getReservations } from '@store/user';

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
  const [isFinished, setIsFinished] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (reservation.date) {
      const time = new Date(reservation.date);
      const timeDiff = time.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(time.valueOf() + timeDiff);
      setIsFinished(new Date().getTime() > adjustedDate.getTime());
      setDate(getDateString(adjustedDate));
    } else if (reservation.days) {
      const dayOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      const weekDays = reservation.days.map((i) => dayOfWeek[i]);
      setDate(`Каждый ${weekDays.join(', ')}`);
    }
  }, []);

  const dispatch = useDispatch();
  const d = useSelector(selectDate);

  const handleClick = async () => {
    if (reservation.date) {
      await provider.delete(`/reservation/${reservation.id}`);
      dispatch(getReservations(d!));
    } else {
      await provider.delete(`/reservation/regular/${reservation.id}`);
      dispatch(getRegularReservations());
    }
  };

  return (
    <div className={cn('w-full flex rounded-2xl py-4 px-6 mb-4', className)}>
      <TableButton id={tableId} reservations={[reservation]} disabled />
      <div className={'ml-6 flex-1'}>
        <p className={'text-3xl'}>
          {reservation.date
            ? new Date(reservation.date).getUTCHours()
            : reservation.hour}
          :00
        </p>
        <p className={'text-xl'}>{date}</p>
      </div>
      <div className={'flex flex-col justify-between items-end'}>
        {reservation.days && <p className={'font-inter'}>Регулярно</p>}
        <Button
          onClick={handleClick}
          className={cn(
            'w-min block bg-white border-2 border-solid font-manrope  rounded px-3 py-1 mt-auto transition-all',
            isFinished
              ? 'border-gray-2 text-gray-2 cursor-default'
              : 'border-primary text-primary hover:bg-blue-3'
          )}
          disabled={isFinished}
          whileTap={isFinished ? undefined : { scale: 0.95 }}
        >
          {isFinished ? 'Окончено' : 'Отменить'}
        </Button>
      </div>
    </div>
  );
};

export default ReservationCard;
