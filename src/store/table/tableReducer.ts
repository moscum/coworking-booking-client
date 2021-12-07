import { createReducer } from '@reduxjs/toolkit';

import { Table } from '@src/types';

import * as actions from './tableActions';

export type TableState = {
  tables: Table[] | null;
  selectedTable: Table | null;
};

export const initialState: TableState = {
  tables: null,
  selectedTable: null,
};

export const tableReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.getTables.fulfilled, (state, action) => {
      state.tables = action.payload;
    })
    .addCase(actions.getTables.rejected, (state) => {
      state.tables = null;
    })

    .addCase(actions.selectTable.fulfilled, (state, action) => {
      state.selectedTable =
        state.tables?.find((i) => i.id === action.payload) ?? null;
    })
);
