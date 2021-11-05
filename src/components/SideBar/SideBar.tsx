import React from 'react';

import { useAuth } from '@src/contexts/auth';

export const SideBar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div className={'bg-white flex-1 p-8 py-6'}>
      <h1 className={'text-4xl'}>Выберите дату</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
