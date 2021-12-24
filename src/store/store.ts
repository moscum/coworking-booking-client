import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/authReducer';
import { reservationReducer } from './reservation/reservationReducer';
import { tableReducer } from './table/tableReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  table: tableReducer,
  auth: authReducer,
  reservation: reservationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
