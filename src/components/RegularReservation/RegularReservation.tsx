import React, { useState } from 'react';

import cn from 'clsx';
import { motion, Variants } from 'framer-motion';

import { useSelector } from '@src/hooks';
import { selectTables } from '@src/store/table';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const RegularReservation: React.VFC = () => {
  // const dispatch = useDispatch();
  const days = {
    Пн: 1,
    Вт: 2,
    Ср: 3,
    Чт: 4,
    Пт: 5,
    Сб: 6,
    Вс: 0,
  };
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [status, setStatus] = useState('not active');
  const tables = useSelector(selectTables);

  const handleClick = () => {
    if (status === 'active') {
      setStatus('not active');
    } else {
      setStatus('active');
    }
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
          <span className="mr-1">Регулярная бронировка:</span>
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
        <div className="grid grid-cols-7 gap-1">
          {tables
            ? Object.keys(days).map((key, value) => (
                <button
                  key={value}
                  value={value}
                  className={cn(
                    'bg-gray-1 text-x1 font-manrope mb-1 p-1 leading-5 rounded',
                    {
                      'bg-primary text-white': status === 'active',
                      'bg-gray-1 hover:bg-blue-3': status === 'not active',
                    },
                    !display && 'hidden'
                  )}
                  onClick={handleClick}
                >
                  {key}
                </button>
              ))
            : ''}
        </div>
      </motion.div>
    </div>
  );
};

export default RegularReservation;
