import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import api from '@src/api';
import { UserModel } from '@src/models';

export const getUserServerSide = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  if (!cookies.SID) {
    return undefined;
  }
  const { data: user } = await api.get<UserModel>('/user', {
    headers: { Cookie: `SID=${cookies.SID}` },
  });

  return user;
};
