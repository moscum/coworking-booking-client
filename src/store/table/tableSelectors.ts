import { RootState } from '@store/store';

export const selectTables = ({ table }: RootState) => table.tables;

export const selectTable = ({ table }: RootState) => table.selectedTable;

export const selectTableId = ({ table }: RootState) => table.selectedTable?.id;

export const selectOtherDayTables = ({ table }: RootState) =>
  table.otherDayTables;
