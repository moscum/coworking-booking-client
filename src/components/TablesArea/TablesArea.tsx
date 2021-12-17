import React from 'react';

import cn from 'clsx';

import TableButton from '@components/TableButton';
import { useSelector } from '@src/hooks';
import { selectTables } from '@store/table';

import styles from './TablesArea.module.scss';

const TablesArea: React.VFC = () => {
  const tables = useSelector(selectTables);

  return (
    <div className={'flex-2 relative'}>
      {tables ? (
        <div className={styles.tableArea}>
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
    </div>
  );
};

export default TablesArea;
