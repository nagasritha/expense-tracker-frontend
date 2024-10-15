// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { expensesReducer } from './expenses.slice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer, // Add your slices here
  },
});

// export type RootState = ReturnType<typeof store.getState>; // To infer the root state type
// export type AppDispatch = typeof store.dispatch; // To infer the dispatch type

export default store;
