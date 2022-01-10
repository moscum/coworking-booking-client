import React, { useEffect, useState } from 'react';

import { Calendar } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import { selectDate, setDate } from '@store/reservation';
import { getReservations } from '@store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

// TODO: make outside click check
const DatePicker: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = React.useState(false);

  useEffect(() => {
    dispatch(getReservations(date!));
  }, [date]);

  return (
    <div className={'relative'}>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-xl font-manrope mb-1 z-0'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <span className="mr-1">{date && getDateString(new Date(date))}</span>

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
        <Calendar
          className={cn('absolute w-8/12 transition-all', !display && 'hidden')}
          onChange={(d) => {
            dispatch(setDate(d.toLocaleDateString('sv')));
          }}
        />
      </motion.div>
    </div>
  );
};

export default DatePicker;
