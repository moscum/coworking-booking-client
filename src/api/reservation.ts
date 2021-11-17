import { AxiosResponse } from 'axios';

import { provider } from '@src/api/provider';
import { ReservationModel } from '@src/models';

export const reservation = {
  getReservationsByDate: (
    date: Date
  ): Promise<AxiosResponse<ReservationModel[]>> =>
    provider.get('/reservation/getReservationsByDate', {
      params: {
        reservationDate: date.toISOString(),
      },
    }),
};
