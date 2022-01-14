import { Reservation } from '@src/types/Reservation';

export interface Table {
  id: number;
  reservations: Reservation[];
}

export interface Tables {
  [id: number]: Reservation[];
}

export interface OtherDaysTables {
  [id: number]: {
    date: string;
    tables: Tables;
  };
}
