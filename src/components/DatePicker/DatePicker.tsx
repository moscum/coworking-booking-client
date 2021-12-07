import React, { useEffect, useState } from 'react';

import { Calendar } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import { selectDate, selectReservation } from '@store/reservation';
import { selectTables } from '@store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

export const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = React.useState(false);
  const { selectedTable } = useSelector(selectTables);
  const { date } = useSelector(selectReservation);
  useEffect(() => {
    if (!selectedTable) {
      setVisible(true);
      setDisplay(true);
    } else {
      setVisible(false);
    }
  }, [selectedTable]);

  return (
    <div className={'relative'}>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-xl font-manrope mb-1'}
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
          onChange={(d) => dispatch(selectDate(d))}
        />
      </motion.div>
    </div>
  );
};
