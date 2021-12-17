import { User } from '@src/types/User';

export interface Reservation {
  id: number;
  date: string;
  user: User;
}
