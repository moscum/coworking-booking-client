import { createAsyncThunk } from '@reduxjs/toolkit';

import { provider } from '@src/api/provider';
import { User } from '@src/types';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const user = await provider.get<User>('/user');
  return user.data;
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
