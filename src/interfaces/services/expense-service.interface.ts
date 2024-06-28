import { Expense } from '../models/expense';

export interface IExpenseService {
  addExpense(expense: Expense): Promise<void>;
  getExpenses(userId: number): Promise<Expense[]>;
  // Add other necessary methods
}
