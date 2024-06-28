import { Request, Response } from 'express';
import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { IExpenseService } from '../interfaces/expense-service.interface';
import { TYPES } from '../types';
import { inject } from 'inversify';
import { check, validationResult } from 'express-validator';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/expenses', authMiddleware)
export class ExpenseController {
  private expenseService: IExpenseService;

  constructor(@inject(TYPES.ExpenseService) expenseService: IExpenseService) {
    this.expenseService = expenseService;
  }

  @httpPost('/', [
    check('amount').isFloat({ gt: 0 }),
    check('category').isString(),
    check('description').isString(),
    check('date').isISO8601()
  ])
  async addExpense(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { userId, amount, category, description, date } = req.body;
    try {
      await this.expenseService.addExpense({ id: 0, userId, amount, category, description, date });
      res.status(201).send('Expense added successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @httpGet('/')
  async getExpenses(req: Request, res: Response): Promise<void> {
    const userId = req.body.userId;
    try {
      const expenses = await this.expenseService.getExpenses(userId);
      res.json(expenses);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
