import { RootState } from '@store/store';

export const selectReservation = ({ reservation }: RootState) => reservation;

// export const selectReservationsByTable =
//   (id: number, time: number) =>
//   ({ reservation }: RootState) =>
//     id &&
//     reservation.reservations?.filter(
//       (x) =>
//         // TODO: change when timezone will be set
//         x.tableId === id && new Date(x.reservationStart).getHours() - 5 === time
//     );

export const selectDate = ({ reservation }: RootState) => reservation.date;
