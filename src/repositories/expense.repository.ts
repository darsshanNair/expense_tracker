import { injectable, inject } from 'inversify';
import { Expense } from '../models/expense';
import { Pool } from 'mysql2/promise';
import { TYPES } from '../types';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';

@injectable()
export class ExpenseRepository implements IExpenseRepository {
  private pool: Pool;

  constructor(@inject(TYPES.Pool) pool: Pool) {
    this.pool = pool;
  }

  async create(expense: Expense): Promise<void> {
    const query = 'INSERT INTO expenses (userId, amount, category, description, date) VALUES (?, ?, ?, ?, ?)';
    await this.pool.execute(query, [expense.userId, expense.amount, expense.category, expense.description, expense.date]);
  }

  async findByUserId(userId: number): Promise<Expense[]> {
    const query = 'SELECT * FROM expenses WHERE userId = ?';
    const [rows] = await this.pool.execute(query, [userId]);
    return rows as Expense[];
  }

  // Add other necessary methods
}
