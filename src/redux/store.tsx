import { configureStore } from '@reduxjs/toolkit';
import payReducer from '../redux/slice/payReducer';
import currentViolationReducer from '../redux/slice/currentViolationReducer';

export const store = configureStore({
  reducer: {
    pay: payReducer,
    currentViolation: currentViolationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch