import axiosInstance from './axios';
import { ExpenseDetails } from '../Interface/expense.interface';

export class ExpensesService {
  // Fetch all expenses
  async getAllExpenses(): Promise<any> {
    try {
      const response = await axiosInstance.get('/expenses');
      console.log('Fetched Expenses:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      throw error; // Throw to handle in UI with state management
    }
  }


  // Method to post expense details
  async postExpenseDetails(expenseData: any) {
    try {
      let email = "nagasritha@gmail.com";
      let customExpenseDetails = {email,...expenseData};
      const response = await axiosInstance.post('/expenses', customExpenseDetails);
      return response.data; // Return the successful response data
    } catch (error: any) {
      // Handle error
      if (error.response) {
        // The server responded with a status other than 2xx
        console.error('Server Error:', error.response.data.message); // Log server error message
        return Promise.reject(error.response.data.message); // Return error message to thunk
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from server:', error.request);
        return Promise.reject('No response from server');
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
        return Promise.reject(error.message);
      }
    }
  }

}
