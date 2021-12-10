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
    .addCase(actions.getReservations.pending, (state) => {
      state.tables = null;
    })
    .addCase(actions.getReservations.fulfilled, (state, action) => {
      state.tables = action.payload;
    })
    .addCase(actions.getReservations.rejected, (state) => {
      state.tables = null;
    })

    .addCase(actions.setSelectedTable.fulfilled, (state, action) => {
      state.selectedTable = action.payload;
    })
);
