import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reservationReducer } from './reservation/reservationReducer';
import { tableReducer } from './table/tableReducer';
import { userReducer } from './user/userReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  table: tableReducer,
  user: userReducer,
  reservation: reservationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
