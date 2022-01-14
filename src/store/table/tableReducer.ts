import { createReducer } from '@reduxjs/toolkit';

import { Table, Tables } from '@src/types';

import * as actions from './tableActions';

export type TableState = {
  tables: Tables | null;
  otherDayTables: { [id: number]: { date: string; tables: Tables } };
  selectedTable: Table | null;
};

export const initialState: TableState = {
  tables: null,
  otherDayTables: {},
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

    .addCase(actions.getOtherDayTables.fulfilled, (state, action) => {
      state.otherDayTables[action.payload.id] = {
        date: action.payload.date,
        tables: action.payload.data,
      };
    })
);
