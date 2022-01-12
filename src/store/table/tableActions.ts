import { createAsyncThunk } from '@reduxjs/toolkit';

import { provider } from '@src/api/provider';
import { Table, Tables } from '@src/types';

export const getTables = createAsyncThunk(
  'table/getTables',
  async (date: string) => {
    const { data } = await provider.get<Tables>('/tables/getReservations', {
      params: {
        date,
      },
    });
    return data;
  }
);

export const setSelectedTable = createAsyncThunk(
  'table/setSelectedTable',
  async (table: Table | null) => {
    return table;
  }
);
