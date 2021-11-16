import React, { createContext, useContext, useState } from 'react';

import { TableModel } from '@src/models';

interface TableContextModel {
  selectedTable: TableModel | null;
  setSelectedTable: React.Dispatch<React.SetStateAction<TableModel | null>>;
  isTableSelected: boolean;
}

const TableContext = createContext<Partial<TableContextModel>>({});

export const TableProvider: React.FC = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState<TableModel | null>(null);
  const isTableSelected = !!selectedTable;

  return (
    <TableContext.Provider
      value={{
        isTableSelected,
        selectedTable,
        setSelectedTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);
