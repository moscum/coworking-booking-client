import { UserModel } from '@src/models/UserModel';

export interface ReservationModel {
  id: number;
  reservationEnd: string;
  reservationStart: string;
  tableId: number;
  user: UserModel;
}
