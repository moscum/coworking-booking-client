import { createAsyncThunk } from '@reduxjs/toolkit';

export const selectDate = createAsyncThunk(
  'reservation/selectDate',
  async (date: Date) => {
    return date.toISOString();
  }
);
