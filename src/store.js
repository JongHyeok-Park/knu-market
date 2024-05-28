import { configureStore } from '@reduxjs/toolkit'
import user from './store/userSlice';
import evaluate from './store/evaluateSlice';

export const store = configureStore({
  reducer: {
    user: user.reducer,
    evaluate: evaluate.reducer
  },
});