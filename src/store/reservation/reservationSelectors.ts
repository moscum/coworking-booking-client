import { RootState } from '@store/store';

export const selectReservationState = ({ reservation }: RootState) =>
  reservation;

export const selectDate = ({ reservation }: RootState) => reservation.date;
