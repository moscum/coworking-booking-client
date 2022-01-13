import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { Reservation } from '@src/types';
import { updateTimeSlots } from '@store/reservation';
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
    dispatch(updateTimeSlots(null));
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
    <button
      className={cn(styles.table, {
        'bg-primary text-white': active,
        'bg-white hover:bg-gray-1': !active && !disabled,
        'bg-white cursor-default': disabled,
      })}
      value={id}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className={'text-2xl'}>
        {id}
        <div
          className={cn(
            styles.tableStatusIndicator,
            reservations.length === 0 && 'bg-success',
            reservations.length === 14 && 'bg-accent',
            reservations.length > 0 && reservations.length < 14 && 'bg-primary'
          )}
        />
      </div>
    </button>
  );
};

export default TableButton;
