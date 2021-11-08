import React from 'react';

import { useTable } from '@src/contexts';
import { useAuth } from '@src/contexts/auth';

export const SideBar: React.FC = () => {
  const { logout } = useAuth();
  const { selectedTable, isTableSelected } = useTable();
  return (
    <div className={'bg-white flex-1 p-8 py-6'}>
      <h1 className={'text-4xl'}>Выберите дату</h1>
      <h1>{`Is table selected: ${isTableSelected}`}</h1>
      <h1>{`Table id: ${selectedTable && selectedTable?.id}`}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
