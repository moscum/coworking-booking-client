import React, { useEffect, useRef, useState } from 'react';

import { Calendar } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import useOutsideClick from '@src/utils/useOutsideClick';
import {
  selectDate,
  setDate,
  setReservationDate,
  updateDaySlots,
  updateTimeSlots,
} from '@store/reservation';
import { getTables } from '@store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const DatePicker: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  useOutsideClick([calendarRef, buttonRef], () => {
    setVisible(false);
  });

  useEffect(() => {
    if (date) dispatch(getTables(date));
    dispatch(updateTimeSlots({ time: null }));
    dispatch(updateDaySlots(null));
  }, [date]);

  return (
    <div className={'relative'}>
      <div className={'mb-2 inline-block'} ref={buttonRef}>
        <button
          className={'text-primary text-xl font-manrope flex items-center'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <p className="mr-1">{date && getDateString(new Date(date))}</p>

          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={visible ? 'transition-all' : '-rotate-90 transition'}
          />
        </button>
      </div>
      <motion.div
        className={'relative z-10'}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
        ref={calendarRef}
      >
        <Calendar
          className={cn(
            'absolute w-[360px] transition-all font-manrope bg-[#fafafa] shadow-lg',
            !display && 'hidden'
          )}
          onChange={(d) => {
            dispatch(setDate(d.toLocaleDateString('sv')));
            dispatch(setReservationDate(d.toLocaleDateString('sv')));
          }}
        />
      </motion.div>
    </div>
  );
};

export default DatePicker;
