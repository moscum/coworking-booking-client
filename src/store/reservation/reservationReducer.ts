import { createReducer } from '@reduxjs/toolkit';

import * as actions from './reservationActions';

export type ReservationState = {
  date: string | null;
  reservationDate: string | null;
  hours: number[];
  days: number[];
};

export const initialState: ReservationState = {
  date: null,
  reservationDate: null,
  hours: [],
  days: [],
};

export const reservationReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.setDate.fulfilled, (state, action) => {
      state.date = action.payload;
    })

    .addCase(actions.setReservationDate.fulfilled, (state, action) => {
      state.reservationDate = action.payload;
    })

    .addCase(actions.updateTimeSlots.fulfilled, (state, action) => {
      if (action.payload === null) state.hours = [];
      else {
        const index = state.hours.findIndex((i) => i === action.payload);
        if (index === -1) state.hours = [...state.hours, action.payload];
        else state.hours.splice(index, 1);
      }
    })

    .addCase(actions.updateDaySlots.fulfilled, (state, action) => {
      if (action.payload === null) state.days = [];
      else {
        const index = state.days.findIndex((i) => i === action.payload);
        if (index === -1) state.days = [...state.days, action.payload];
        else state.days.splice(index, 1);
      }
    })
);
