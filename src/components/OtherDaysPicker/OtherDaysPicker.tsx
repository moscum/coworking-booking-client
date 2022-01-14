import React, { useEffect, useState } from 'react';

import { motion, Variants } from 'framer-motion';

import TimePicker from '@components/TimePicker';
import { useDispatch, useSelector } from '@src/hooks';
import { getDateString } from '@src/utils';
import { selectDate } from '@store/reservation';
import {
  getOtherDayTables,
  selectOtherDayTables,
  selectTableId,
  selectTables,
} from '@store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const OtherDaysPicker: React.VFC = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  const tables = useSelector(selectTables);
  const tableId = useSelector(selectTableId);
  const otherDayTables = useSelector(selectOtherDayTables);

  useEffect(() => {
    const nextDate = new Date(date!);
    nextDate.setDate(nextDate.getDate() + 1);
    dispatch(
      getOtherDayTables({ id: 1, date: nextDate.toLocaleDateString('sv') })
    );
    nextDate.setDate(nextDate.getDate() + 1);
    dispatch(
      getOtherDayTables({ id: 2, date: nextDate.toLocaleDateString('sv') })
    );
    nextDate.setDate(nextDate.getDate() + 1);
    dispatch(
      getOtherDayTables({ id: 3, date: nextDate.toLocaleDateString('sv') })
    );
  }, [tableId, date, tables]);

  return (
    <div className={'relative'}>
      <div className={'flex items-center'}>
        <button
          className={'text-primary text-xl font-manrope mb-1 flex items-center'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={
              visible ? 'inline transition-all' : 'inline -rotate-90 transition'
            }
          />
          <p className="ml-1">Другие дни</p>
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
      >
        <div className={display ? '' : 'hidden'}>
          {Object.keys(otherDayTables).map((i) => {
            const key = Number(i);
            return (
              <div key={i}>
                <p className={'text-xl'}>
                  {getDateString(new Date(otherDayTables[key]!.date))}
                </p>
                <TimePicker
                  date={otherDayTables[key]!.date}
                  reservations={otherDayTables[key]!.tables[tableId!]!}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default OtherDaysPicker;
