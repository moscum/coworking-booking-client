import React, { useState } from 'react';

import { Calendar } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { provider } from '@src/api';
import { useDispatch, useSelector } from '@src/hooks';
import { selectTableId, getTables } from '@src/store/table';
import {
  updateTimeSlots,
  selectDate,
  setDate,
  selectReservation,
} from '@store/reservation';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const RegularReservation: React.VFC = () => {
  const dispatch = useDispatch();
  const reservation = useSelector(selectReservation);
  const date = useSelector(selectDate);
  const tableId = useSelector(selectTableId);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [weekStatus, setWeekStatus] = useState('free');
  const [numberWeekday, setNumberWeekday] = useState([0]);
  const handleClick = async () => {
    if (weekStatus === 'selected') {
      setWeekStatus('free');
    } else {
      setWeekStatus('selected');
    }
    console.log(
      ' tableId: ',
      tableId,
      '     numberOfDayInTheWeek:',
      numberWeekday,
      '   hours:',
      reservation.hours
    );
    await provider
      .put(
        '/reservation/addRegularReservations',
        JSON.stringify({
          id: tableId,
          days: numberWeekday,
          hours: reservation.hours,
        })
      )
      .finally(() => {
        dispatch(getTables(date!));
        dispatch(updateTimeSlots(null));
      });
  };
  return (
    <div>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-x1 font-manrope mb-1'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <span className="mr-1">Регулярное бронирование:</span>
          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={
              visible ? 'inline transition-all' : 'inline -rotate-90 transition'
            }
          />
        </button>
      </div>
      <div>
        <button
          className={cn(
            'text-x1 font-manrope mb-1 p-1 leading-5 rounded',
            visible ? 'visible' : 'hidden',
            {
              'bg-primary text-white': weekStatus === 'selected',
              'bg-gray-1 hover:bg-blue-3': weekStatus === 'free',
            }
          )}
          onClick={handleClick}
        >
          Забронировать
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
      >
        <Calendar
          className={cn(
            'absolute w-[360px] transition-all font-manrope z-10',
            !display && 'hidden'
          )}
          onChange={(d) => {
            dispatch(setDate(d.toLocaleDateString('sv')));
            setNumberWeekday([d.getDay()]);
          }}
        />
      </motion.div>
    </div>
  );
};

export default RegularReservation;
