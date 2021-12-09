import { RootState } from '@store/store';

export const selectTable = ({ table }: RootState) => table.selectedTable;

export const selectTables = ({ table }: RootState) => table.tables;

export const selectTableReservations =
  (tableId: number | null) =>
  ({ table }: RootState) => {
    if (table.tables && tableId) return table.tables[tableId] ?? null;
    return null;
  };
