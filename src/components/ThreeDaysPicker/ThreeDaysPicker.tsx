import React, { useEffect, useState } from 'react';

import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import TimePicker from '@components/TimePicker';
import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import { selectDate } from '@store/reservation';
import { getReservations } from '@store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const ThreeDaysPicker: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  const NextDate = new Date(date!);
  const NextDate2 = new Date(date!);
  const NextDate3 = new Date(date!);
  NextDate.setDate(NextDate.getDate() + 1);
  NextDate2.setDate(NextDate2.getDate() + 2);
  NextDate3.setDate(NextDate3.getDate() + 3);

  useEffect(() => {
    dispatch(getReservations(date!));
  }, [date]);

  return (
    <div className={'relative'}>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-x1 font-manrope mb-1'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <span className="mr-1">Другие дни:</span>
          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={
              visible ? 'inline transition-all' : 'inline -rotate-90 transition'
            }
          />
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
      >
        <span className={cn('mr-1', !display && 'hidden')}>
          {NextDate && getDateString(NextDate)}
          <TimePicker />
        </span>
        <span className={cn('mr-1', !display && 'hidden')}>
          {NextDate2 && getDateString(NextDate2)}
          <TimePicker />
        </span>
        <span className={cn('mr-1', !display && 'hidden')}>
          {NextDate3 && getDateString(NextDate3)}
          <TimePicker />
        </span>
      </motion.div>
    </div>
  );
};

export default ThreeDaysPicker;
