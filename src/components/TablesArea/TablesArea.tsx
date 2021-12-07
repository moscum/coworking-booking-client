import React, { useEffect } from 'react';

import cn from 'clsx';

import { Table } from '@src/components/Table';
import { useDispatch, useSelector } from '@src/hooks';
import { getTables, selectTables } from '@store/table';

import styles from './TablesArea.module.scss';

export const TablesArea: React.FC = () => {
  const dispatch = useDispatch();
  const { tables } = useSelector(selectTables);

  useEffect(() => {
    if (!tables) dispatch(getTables());
  }, []);

  return (
    <div className={'flex-2 relative'}>
      {tables ? (
        <div className={styles.tableArea}>
          {tables.map((table) => (
            <Table key={table.id} table={table} />
          ))}
        </div>
      ) : (
        <div className={cn(styles.tableArea, 'animate-shine')} />
      )}
    </div>
  );
};
