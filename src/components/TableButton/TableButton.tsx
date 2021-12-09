import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { Table } from '@src/types';
import { setSelectedTable, selectTable } from '@store/table';

import styles from '../TablesArea/TablesArea.module.scss';

const TableButton: React.VFC<Table> = ({ id, reservations }) => {
  const selectedTable = useSelector(selectTable);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!active) dispatch(setSelectedTable(id));
    if (active) dispatch(setSelectedTable(null));
  };

  useEffect(() => {
    setActive(false);
    if (selectedTable === id) setActive(true);
  }, [selectedTable]);

  return (
    <button
      className={cn(styles.table, active ? 'bg-primary text-white' : '')}
      value={id}
      onClick={handleClick}
    >
      <div>
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
