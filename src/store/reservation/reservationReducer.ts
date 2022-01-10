import { createReducer } from '@reduxjs/toolkit';

import * as actions from './reservationActions';

export type ReservationState = {
  date: string | null;
  hours: number[];
};

export const initialState: ReservationState = {
  date: null,
  hours: [],
};

export const reservationReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setDate.fulfilled, (state, action) => {
    state.date = action.payload;
  });
  builder.addCase(actions.updateTimeSlots.fulfilled, (state, action) => {
    const index = state.hours.findIndex((i) => i === action.payload);
    if (index === -1) state.hours = [...state.hours, action.payload];
    else state.hours.splice(index, 1);
  });
});
