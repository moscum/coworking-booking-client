import React from 'react';

import cn from 'clsx';

import TableButton from '@components/TableButton';
import { useSelector } from '@src/hooks';
import { selectTables } from '@store/table';

import styles from './TablesArea.module.scss';

const TablesArea: React.VFC = () => {
  const tables = useSelector(selectTables);

  return (
    <>
      {tables ? (
        <div
          className={cn(
            styles.tableArea,
            'absolute inset-0 grid grid-flow-col items-center justify-items-center w-[480px] h-[480px] m-auto rounded-2xl bg-blue-3'
          )}
        >
          {Object.keys(tables).map((id) => {
            const tableId = Number(id);
            return (
              <TableButton
                key={id}
                id={tableId}
                reservations={tables[tableId] ?? []}
              />
            );
          })}
        </div>
      ) : (
        <div
          className={
            'absolute inset-0 m-auto animate-shine w-[480px] h-[480px] rounded-2xl'
          }
        />
      )}
      <img
        className="absolute bottom-6 right-8"
        src={'images/logo.svg'}
        alt={'logo'}
      />
    </>
  );
};

export default TablesArea;
