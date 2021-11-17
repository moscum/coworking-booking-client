import useSWR from 'swr';

import { api } from '@src/api';
import { ReservationModel } from '@src/models';

export function useReservations(date: Date) {
  const {
    data: res,
    error,
    isValidating,
    mutate,
  } = useSWR(['/reservation/getReservationsByDate', date], (url, param) =>
    api.provider.get<ReservationModel[]>(url, {
      params: {
        reservationDate: param.toISOString(),
      },
    })
  );

  return { data: res && res.data, error, isValidating, mutate };
}
