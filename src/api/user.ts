import { AxiosResponse } from 'axios';

import { provider } from '@src/api/provider';
import { UserModel } from '@src/models';

export const user = {
  login: (email: string, password: string): Promise<AxiosResponse<any>> =>
    provider.post(
      '/security/login',
      JSON.stringify({
        email,
        password,
      })
    ),

  logout: (): Promise<AxiosResponse<any>> => provider.post('/security/logout'),

  getUser: (options?: any): Promise<AxiosResponse<UserModel>> =>
    provider.get('/user', options),
};
