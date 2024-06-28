import { Expense } from '../models/expense';

export interface IExpenseRepository {
  create(expense: Expense): Promise<void>;
  findByUserId(userId: number): Promise<Expense[]>;
  // Add other necessary methods
}
