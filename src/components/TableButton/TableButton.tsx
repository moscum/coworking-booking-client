import React, { useEffect, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import { updateDaySlots, updateTimeSlots } from '@store/reservation';
import { setSelectedTable, selectTable, selectTables } from '@store/table';

import styles from '../TablesArea/TablesArea.module.scss';

interface Props {
  id: number;
  reservations: Reservation[];
  disabled?: boolean;
}

const TableButton: React.VFC<Props> = ({ id, reservations, disabled }) => {
  const selectedTable = useSelector(selectTable);
  const [active, setActive] = useState(false);
  const tables = useSelector(selectTables);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!active) dispatch(setSelectedTable({ id, reservations }));
    if (active) dispatch(setSelectedTable(null));
    dispatch(updateTimeSlots({ time: null }));
    dispatch(updateDaySlots(null));
  };

  useEffect(() => {
    setActive(false);
    if (selectedTable?.id === id) setActive(true);
  }, [selectedTable]);

  useEffect(() => {
    if (selectedTable?.id === id)
      dispatch(setSelectedTable({ id, reservations }));
  }, [tables]);

  return (
    <Button
      className={cn(
        styles.table,
        'relative font-bold rounded-[0.25rem] transition-all p-0 font-manrope',
        {
          'bg-primary text-white': active,
          'bg-white hover:bg-gray-1 text-black': !active && !disabled,
          'bg-white cursor-default text-black': disabled,
        }
      )}
      value={id}
      onClick={handleClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
    >
      <div className={'text-2xl'}>
        {id}
        <div
          className={cn(
            styles.tableStatusIndicator,
            'absolute  bottom-[-1rem] w-7 h-7 border-solid border-4 border-white rounded-[50%]',
            reservations.length === 0 && 'bg-success',
            reservations.length === 14 && 'bg-accent',
            reservations.length > 0 && reservations.length < 14 && 'bg-primary'
          )}
        />
      </div>
    </Button>
  );
};

export default TableButton;
