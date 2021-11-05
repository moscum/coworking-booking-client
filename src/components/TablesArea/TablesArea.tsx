import React from 'react';

import { Table } from '@src/components/Table';
// import { useTables } from '@src/hooks';

export const TablesArea: React.FC = () => {
  // const { tables, isValidating, error } = useTables();
  const tables = [
    { id: 1, status: 'occupied for day' },
    { id: 2, status: 'not occupied' },
    { id: 3, status: 'occupied for time slot' },
    { id: 4, status: 'occupied' },
    { id: 5, status: 'occupied for time slot' },
    { id: 6, status: 'not occupied' },
    { id: 7, status: 'occupied for day' },
    { id: 8, status: 'not occupied' },
    { id: 9, status: 'occupied for time slot' },
    { id: 10, status: 'occupied' },
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
      <div
        className={'h-3/5 my-32 mx-60 border-dashed border-4 border-primary'}
      >
        <div
          className={
            'mt-4 grid grid-flow-col grid-rows-4 grid-cols-3 justify-items-center items-center gap-x-0 gap-y-10'
          }
        >
          {tables.map((table) => (
            <Table key={table.id} id={table.id} status={table.status} />
          ))}
        </div>
      </div>
      {/* {tables && tables.map((item) => <p key={item.id}>{item.id}</p>)} */}
    </div>
  );
};
