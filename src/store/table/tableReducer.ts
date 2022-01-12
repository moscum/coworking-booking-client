import { createReducer } from '@reduxjs/toolkit';

import { Table, Tables } from '@src/types';

import * as actions from './tableActions';

export type TableState = {
  tables: Tables | null;
  selectedTable: Table | null;
};

export const initialState: TableState = {
  tables: null,
  selectedTable: null,
};

export const tableReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.getTables.pending, (state) => {
      state.tables = null;
    })
    .addCase(actions.getTables.fulfilled, (state, action) => {
      state.tables = action.payload;
    })
    .addCase(actions.getTables.rejected, (state) => {
      state.tables = null;
    })

    .addCase(actions.setSelectedTable.fulfilled, (state, action) => {
      state.selectedTable = action.payload;
    })
);
