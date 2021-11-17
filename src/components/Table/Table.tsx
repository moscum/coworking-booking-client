import React, { useEffect, useState } from 'react';

import cn from 'clsx';

import { useReservation } from '@src/contexts';
import { TableModel } from '@src/models';

import styles from '../TablesArea/TablesArea.module.scss';

interface Props {
  table: TableModel;
}

export const Table: React.FC<Props> = ({ table }) => {
  const { selectedTable, setSelectedTable } = useReservation();
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
