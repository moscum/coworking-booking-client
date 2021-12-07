import { User } from '@src/types/User';

export interface Reservation {
  id: number;
  reservationEnd: Date;
  reservationStart: Date;
  tableId: number;
  user: User;
}
