import React, { useState } from 'react';

import { SideBar } from '@components/SideBar';
import { TableContext, ChosenContext } from '@components/Table/TableContext';
import { TablesArea } from '@components/TablesArea';

export const UserLayout: React.FC = () => {
  const [context, setContext] = useState('');
  const [chosenContext, setChosenContext] = useState('');
  return (
    <TableContext.Provider value={[context, setContext]}>
      <ChosenContext.Provider value={[chosenContext, setChosenContext]}>
        <div className={'bg-white h-screen flex'}>
          <SideBar />
          <TablesArea />
        </div>
      </ChosenContext.Provider>
    </TableContext.Provider>
  );
};
