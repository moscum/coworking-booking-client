import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useTable } from '@src/contexts';
import { TableModel } from '@src/models';

import styles from '../TablesArea/TablesArea.module.scss';

interface Props {
  table: TableModel;
  horizontal?: boolean;
}

export const Table: React.FC<Props> = ({ table, horizontal }) => {
  const { selectedTable, setSelectedTable } = useTable();
  const [active, setActive] = useState(false);

  const handler = () => {
    if (active) setSelectedTable!(null);
    if (!active) setSelectedTable!(table);
  };

  useEffect(() => {
    setActive(false);
    if (selectedTable === table) setActive(true);
  }, [selectedTable, table]);

  return (
    <button
      className={cn(
        styles.table,
        active ? 'bg-primary' : '',
        horizontal ? styles.table_h : ''
      )}
      value={table.id}
      onClick={handler}
    >
      <div className={styles.disabled}>
        {table.id}
        <div
          className={cn(
            'w-4 h-4 border-solid border-white border-2 rounded',
            horizontal ? 'ml-6' : 'ml-6 -mt-5',
            table.status === 'Free' ? 'bg-success' : '',
            table.status === 'Partially' ? 'bg-primary' : '',
            table.status === 'Busy' ? 'bg-accent' : ''
          )}
        />
      </div>
    </button>
  );
};
