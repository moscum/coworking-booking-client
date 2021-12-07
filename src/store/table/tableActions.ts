import { createAsyncThunk } from '@reduxjs/toolkit';

import { provider } from '@src/api/provider';
import { Table } from '@src/types';

export const getTables = createAsyncThunk('table/getTables', async () => {
  const { data } = await provider.get<Table[]>('/tables');
  return data;
});

export const selectTable = createAsyncThunk(
  'table/selectTable',
  async (id: number) => {
    return id;
  }
);
