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
            'absolute inset-0 grid grid-flow-col items-center justify-items-center w-[480px] h-[480px] m-auto rounded-[16px] bg-blue-3'
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
        <div className={cn(styles.tableArea, 'animate-shine')} />
      )}
      <img
        className="absolute w-[96px] h-[42px] bottom-[24px] right-24px"
        src={'images/host_logo_rgb_blue.png'}
        alt={'company logo'}
      />
    </>
  );
};

export default TablesArea;
