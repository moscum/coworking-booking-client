import React from 'react';

import { SideBar } from '@components/SideBar';
import { TablesArea } from '@components/TablesArea';

export const UserLayout: React.FC = () => {
  return (
    <div className={'bg-white h-screen flex'}>
      <SideBar />
      <TablesArea />
    </div>
  );
};
