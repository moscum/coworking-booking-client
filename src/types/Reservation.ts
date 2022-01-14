import { User } from '@src/types/User';

export interface Reservation {
  id: number;
  user: User;
  tableId: number;
  date?: string;
  hour?: number;
  days?: [number];
}
