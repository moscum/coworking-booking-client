import React from 'react';

// import { TableContext, ChosenContext } from '@components/Table/TableContext';

export const SideBar: React.FC = () => {
  // const [context] = useContext(TableContext);
  // const [chosenContext] = useContext(ChosenContext);
  return (
    <div className={'bg-white flex-1 p-8 py-6'}>
      <h1 className={'text-4xl'}>Выберите дату</h1>
      {/* <div>Номер:{context}</div>
      <div>Выбран ли стол: {chosenContext}</div> */}
    </div>
  );
};
