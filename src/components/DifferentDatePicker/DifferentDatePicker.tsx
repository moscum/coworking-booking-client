import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useReservation } from '@src/contexts';
import { getDateString } from '@src/utils';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

export const DifferentDatePicker: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const { selectedDate, selectedTable, reservations } = useReservation();
  const NextDate = new Date(selectedDate!);
  const NextDate2 = new Date(selectedDate!);
  const NextDate3 = new Date(selectedDate!);
  NextDate.setDate(NextDate.getDate() + 1);
  NextDate2.setDate(NextDate2.getDate() + 2);
  NextDate3.setDate(NextDate3.getDate() + 3);

  useEffect(() => {
    if (selectedTable) {
      setVisible(true);
      setDisplay(true);
    } else {
      setVisible(false);
    }
  }, [selectedTable]);

  return (
    <div className={'relative'}>
      <button
        className={clsx(
          'text-primary text-xl font-manrope mb-1',
          visible ? '' : 'hidden'
        )}
        onClick={() => {
          setDisplay(!display);
        }}
      >
        <span className="mr-1">Другие дни</span>

        <img
          src={'/images/arrow.svg'}
          alt={'arrow'}
          className={
            display ? 'inline transition-all' : 'inline -rotate-90 transition'
          }
        />
      </button>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
      >
        <p className={clsx('mr-1', display && 'hidden')}>
          {NextDate && getDateString(NextDate)}
          <p>
            Reservation start:{' '}
            {reservations &&
              reservations.map((i) => (
                <span key={i.id}>{`${i.reservationStart}`}</span>
              ))}
          </p>
          <p>
            Reservation end:{' '}
            {reservations &&
              reservations.map((i) => (
                <span key={i.id}>{`${i.reservationEnd}`}</span>
              ))}
          </p>
        </p>
        <p className={clsx('mr-1', display && 'hidden')}>
          {NextDate && getDateString(NextDate2)}
        </p>
        <p className={clsx('mr-1', display && 'hidden')}>
          {NextDate && getDateString(NextDate3)}
        </p>
      </motion.div>
    </div>
  );
};
