import React, { useEffect, useState } from 'react';

import { Calendar } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import { selectDate, setDate, updateTimeSlots } from '@store/reservation';
import { getTables } from '@store/table';

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
    dispatch(getTables(date!));
    dispatch(updateTimeSlots(null));
  }, [date]);

  return (
    <div className={'relative'}>
      <div className={'flex items-center mb-2'}>
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
      >
        <Calendar
          className={cn(
            'absolute w-[360px] transition-all font-manrope bg-[#fafafa]',
            !display && 'hidden'
          )}
          onChange={(d) => {
            dispatch(setDate(d.toLocaleDateString('sv')));
          }}
        />
      </motion.div>
    </div>
  );
};

export default DatePicker;
