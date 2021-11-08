import React from 'react';

import { Table } from '@src/components/Table';

import styles from './TablesArea.module.scss';

export const TablesArea: React.FC = () => {
  const tables = [
    { id: '1', status: 'Busy' },
    { id: '2', status: 'Free' },
    { id: '3', status: 'Partially' },
    { id: '4', status: 'Busy' },
    { id: '5', status: 'Partially' },
    { id: '6', status: 'Free' },
    { id: '7', status: 'Busy' },
    { id: '8', status: 'Free' },
    { id: '9', status: 'Partially' },
    { id: '10', status: 'Busy' },
  ];
  return (
    <div className={'flex-2'}>
      <div className={'h-3/5 my-32 mx-60 border-dashed border-4 border-black'}>
        <div className={styles.tableArea}>
          {tables.map((table) => (
            <Table key={table.id} table={table} horizontal />
          ))}
        </div>
      </div>
    </div>
  );
};
