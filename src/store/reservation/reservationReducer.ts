import { createReducer } from '@reduxjs/toolkit';

import * as actions from './reservationActions';

export type ReservationState = {
  date: string | null;
};

export const initialState: ReservationState = {
  date: null,
};

export const reservationReducer = createReducer(initialState, (builder) =>
  builder.addCase(actions.selectDate.fulfilled, (state, action) => {
    state.date = action.payload;
  })
);
