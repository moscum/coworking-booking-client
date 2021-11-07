import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { user } from '@src/api';

export const getUserServerSide = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  if (!cookies.SID) {
    return undefined;
  }
  const { data } = await user.getUser({
    headers: { Cookie: `SID=${cookies.SID}` },
  });

  return data;
};
