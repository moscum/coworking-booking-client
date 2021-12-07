import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useDispatch, useSelector } from '@src/hooks';
import { selectTable, selectTables } from '@store/table';

import styles from '../TablesArea/TablesArea.module.scss';
import { Props } from './Table.types';

export const Table: React.FC<Props> = ({ table }) => {
  const { selectedTable } = useSelector(selectTables);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const handler = () => {
    if (!active) dispatch(selectTable(table.id));
  };

  useEffect(() => {
    setActive(false);
    if (selectedTable === table) setActive(true);
  }, [selectedTable]);

  return (
    <button
      className={cn(styles.table, active ? 'bg-primary text-white' : '')}
      value={table.id}
      onClick={handler}
    >
      <div className={styles.disabled}>
        {table.id}
        <div
          className={cn(
            styles.tableStatusIndicator,
            table.status === 'Free' ? 'bg-success' : '',
            table.status === 'Partially' ? 'bg-primary' : '',
            table.status === 'Busy' ? 'bg-accent' : ''
          )}
        />
      </div>
    </button>
  );
};
