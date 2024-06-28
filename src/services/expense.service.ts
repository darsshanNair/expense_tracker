import { injectable, inject } from 'inversify';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';
import { TYPES } from '../types';
import { Expense } from '../models/expense';
import { IExpenseService } from '../interfaces/expense-service.interface';

@injectable()
export class ExpenseService implements IExpenseService {
  private expenseRepository: IExpenseRepository;

  constructor(@inject(TYPES.ExpenseRepository) expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async addExpense(expense: Expense): Promise<void> {
    await this.expenseRepository.create(expense);
  }

  async getExpenses(userId: number): Promise<Expense[]> {
    return await this.expenseRepository.findByUserId(userId);
  }

  // Add other necessary methods
}
