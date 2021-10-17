import React from 'react';

import { useTables } from '@src/hooks';

export const TablesArea: React.FC = () => {
  const { tables, isValidating, error } = useTables();

  if (isValidating)
    return (
      <div className={'flex-2'}>
        <p>Loading</p>
      </div>
    );
  if (error)
    return (
      <div className={'flex-2'}>
        <p>Error</p>
      </div>
    );
  return (
    <div className={'flex-2'}>
      {tables && tables.map((item) => <p key={item.id}>{item.id}</p>)}
    </div>
  );
};
