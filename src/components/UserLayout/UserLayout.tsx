import React from 'react';

import { SideBar } from '@components/SideBar';
import { TablesArea } from '@components/TablesArea';

export const UserLayout: React.FC = () => {
  return (
    <div className={'bg-secondary h-screen flex'}>
      <SideBar />
      <TablesArea />
    </div>
  );
};
