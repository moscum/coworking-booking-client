import { createAsyncThunk } from '@reduxjs/toolkit';

export const setDate = createAsyncThunk(
  'reservation/selectDate',
  async (date: string) => date
);

export const updateTimeSlots = createAsyncThunk(
  'reservation/addTimeSlots',
  async (time: number | null) => time
);
