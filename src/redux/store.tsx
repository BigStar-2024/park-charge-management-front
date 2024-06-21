import { configureStore } from '@reduxjs/toolkit';
import payReducer from '../redux/slice/payReducer';
import currentViolationReducer from '../redux/slice/currentViolationReducer';
import violationSelectedTopayReducer from './slice/violationSelectedTopayReducer';

export const store = configureStore({
  reducer: {
    pay: payReducer,
    currentViolation: currentViolationReducer,
    violationSelectedTopay: violationSelectedTopayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch