import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ExpenseDetails } from '../Interface/expense.interface';
import { ExpensesService } from '../services/expense.service'; // Import your service
import { PageStatus } from '../utils/pageStatus';

let pageStatusObject = new PageStatus();

interface ExpensesState {
  expenses: ExpenseDetails[];
  page_status: string;
  message: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  page_status: pageStatusObject.initial,
  message: null,
};

// Create an instance of your service
const expensesService = new ExpensesService();

// Async thunk to fetch all expenses
export const fetchExpenses = createAsyncThunk<ExpenseDetails[], void>(
  'expenses/fetchExpenses',
  async () => {
    const response = await expensesService.getAllExpenses(); // Call service method
    return response; // Adjust based on your API response structure
  }
);

// Async thunk to create a new expense
export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expenseData: ExpenseDetails, { rejectWithValue }) => {
    try {
      const response = await expensesService.postExpenseDetails(expenseData);
      return response; // On success, return the data
    } catch (error: any) {
      console.log(error, "error from slice");
      // Return the error message from service to slice
      return rejectWithValue(error || 'An unknown error occurred');
    }
  }
);

// Create the slice
const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.page_status = pageStatusObject.initial; // Clear error message and reset status
      state.message = null; // Clear error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.page_status = pageStatusObject.loading; // Set loading status
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success; // Set success status
        state.expenses = action.payload; // Set fetched expenses
        state.message = null; // Clear error message
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.page_status = pageStatusObject.error; // Set error status
        state.message = action.payload as string || 'Failed to fetch expenses'; // Set error message
      })
      .addCase(createExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading; // Set loading status
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success; // Set success status
        state.message = 'Expense created successfully'; // Optional success message
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error; // Set error status
        state.message = action.payload as string || 'Failed to create expense'; // Set error message
      });
  },
});

// Export the actions and reducer
export const { clearError } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;
