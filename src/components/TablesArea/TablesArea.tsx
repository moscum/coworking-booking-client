import React from 'react';

import { Table } from '@src/components/Table';
import styles from '@src/styles/TablesArea.module.scss';

// import { useTables } from '@src/hooks';

export const TablesArea: React.FC = () => {
  // const { tables, isValidating, error } = useTables();
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

  // if (isValidating)
  //   return (
  //     <div className={'flex-2'}>
  //       <p>Loading</p>
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className={'flex-2'}>
  //       <p>Error</p>
  //     </div>
  //   );
  return (
    <div className={'flex-2'}>
      <div className={'h-3/5 my-32 mx-60 border-dashed border-4 border-black'}>
        {/* <div
          className={
            'mt-16 grid grid-flow-col grid-rows-4 grid-cols-3 justify-items-center items-center gap-x-0 gap-y-4'
          }
        > */}
        <div className={styles.tableArea}>
          {tables.map((table) => (
            <Table
              // className={`${styles.table}--${table.id}`}
              key={table.id}
              props={table}
            />
          ))}
        </div>
      </div>
      {/* {tables && tables.map((item) => <p key={item.id}>{item.id}</p>)} */}
    </div>
  );
};
