import { createAsyncThunk } from '@reduxjs/toolkit';

import { provider } from '@src/api/provider';
import { Reservation, User } from '@src/types';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const { data } = await provider.get<User>('/user');
  return data;
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    await provider.post(
      '/security/login',
      JSON.stringify({
        email,
        password,
      })
    );
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await provider.post('/security/logout');
});

export const getReservations = createAsyncThunk(
  'user/getReservations',
  async (date: string) => {
    const { data } = await provider.get<Reservation[]>(
      '/reservation/getMyReservationsByDate',
      {
        params: {
          date,
        },
      }
    );
    return data;
  }
);

export const getRegularReservations = createAsyncThunk(
  'user/getRegularReservations',
  async () => {
    const { data } = await provider.get<Reservation[]>(
      '/reservation/getMyRegularReservations'
    );
    return data;
  }
);
