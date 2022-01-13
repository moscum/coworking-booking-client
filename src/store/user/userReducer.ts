import { createReducer } from '@reduxjs/toolkit';

import { Reservation, User } from '@src/types';

import * as actions from './userActions';

export type UserState = {
  user: User | null;
  reservations: Reservation[] | null;
  isLoggedIn: boolean;
  isLoading: boolean;
};

export const initialState: UserState = {
  user: null,
  reservations: [],
  isLoggedIn: false,
  isLoading: true,
};

export const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.getUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actions.getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    })
    .addCase(actions.getUser.rejected, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    })

    .addCase(actions.login.fulfilled, (state) => {
      state.isLoggedIn = true;
    })
    .addCase(actions.login.rejected, (state) => {
      state.isLoggedIn = false;
      throw new Error();
    })

    .addCase(actions.logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actions.logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    })
    .addCase(actions.logout.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(actions.getReservations.pending, (state) => {
      state.reservations = null;
    })
    .addCase(actions.getReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
    })
    .addCase(actions.getReservations.rejected, (state) => {
      state.reservations = [];
    })
);
