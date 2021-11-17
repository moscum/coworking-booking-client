import React, { useState } from 'react';

import { Calendar } from 'clcm';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useReservation } from '@src/contexts';
import { getDateString } from '@src/utils';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

export const DatePicker: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = React.useState(false);
  const { selectedDate, setSelectedDate } = useReservation();

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
          <span className="mr-1">
            {selectedDate && getDateString(selectedDate)}
          </span>

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
          className={clsx(
            'absolute w-8/12 transition-all',
            !display && 'hidden'
          )}
          value={selectedDate}
          onChange={async (da) => {
            await setSelectedDate!(da);
          }}
        />
      </motion.div>
    </div>
  );
};
