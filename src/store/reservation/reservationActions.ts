import { createAsyncThunk } from '@reduxjs/toolkit';

// export const getReservationsByDate = createAsyncThunk(
//   'reservation/getReservationsByDate',
//   async (date: Date) => {
//     const { data } = await provider.get<Reservation[]>(
//       '/reservation/getReservationsByDate',
//       {
//         params: {
//           reservationDate: date.toISOString(),
//         },
//       }
//     );
//     return data;
//   }
// );

export const setDate = createAsyncThunk(
  'reservation/selectDate',
  async (date: Date) => date.toISOString()
);
