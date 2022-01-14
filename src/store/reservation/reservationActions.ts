import { createAsyncThunk } from '@reduxjs/toolkit';

export const setDate = createAsyncThunk(
  'reservation/setDate',
  async (date: string) => date
);

export const setReservationDate = createAsyncThunk(
  'reservation/setReservationDate',
  async (date: string) => date
);

export const updateTimeSlots = createAsyncThunk(
  'reservation/updateTimeSlots',
  async ({ time }: { time: number | number[] | null }) => time
);

export const updateDaySlots = createAsyncThunk(
  'reservation/updateDaySlots',
  async (time: number | null) => time
);
