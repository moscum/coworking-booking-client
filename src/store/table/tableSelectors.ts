import { RootState } from '@store/store';

export const selectTable = ({ table }: RootState) => table.selectedTable;

export const selectTables = ({ table }: RootState) => table.tables;

export const selectTableId = ({ table }: RootState) => table.selectedTable?.id;
