import { createAsyncThunk } from '@reduxjs/toolkit';

import { provider } from '@src/api/provider';
import { User } from '@src/types';

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const user = await provider.get<User>('/user');
  return user.data;
});

export const login = createAsyncThunk(
  'auth/login',
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await provider.post('/security/logout');
});
