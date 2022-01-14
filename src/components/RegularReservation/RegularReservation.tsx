import React, { useState } from 'react';

import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import DaySlotButton from '@components/DaySlotButton';
import { useDispatch } from '@src/hooks';
import { updateDaySlots } from '@store/reservation';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const RegularReservation: React.VFC = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-xl font-manrope mb-1 flex items-center'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
            dispatch(updateDaySlots(null));
          }}
        >
          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={
              visible ? 'inline transition-all' : 'inline -rotate-90 transition'
            }
          />
          <span className={'ml-1'}>Регулярное бронирование</span>
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
      >
        <div className={cn('grid grid-cols-7 gap-1', display ? '' : 'hidden')}>
          {[1, 2, 3, 4, 5, 6, 0].map((i) => (
            <DaySlotButton key={i} day={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RegularReservation;
