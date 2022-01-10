import { RootState } from '@store/store';

export const selectReservation = ({ reservation }: RootState) => reservation;

export const selectDate = ({ reservation }: RootState) => reservation.date;
