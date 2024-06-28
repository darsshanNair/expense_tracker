import 'reflect-metadata';
import request from 'supertest';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from '../../types';
import { ExpenseController } from '../expense.controller';
import { IExpenseService } from '../../interfaces/expense-service.interface';
import { ExpenseService } from '../../services/expense.service';
import { authMiddleware } from '../../middlewares/auth.middleware';
import express from 'express';

// Mock the ExpenseService
const mockExpenseService: Partial<IExpenseService> = {
  addExpense: jest.fn(),
  getExpenses: jest.fn()
};

// Mock auth middleware
jest.mock('../../middlewares/auth.middleware', () => ({
  authMiddleware: (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body.userId = 1; // Mock userId
    next();
  }
}));

const container = new Container();
container.bind<IExpenseService>(TYPES.ExpenseService).toConstantValue(mockExpenseService as IExpenseService);

let server: InversifyExpressServer;

beforeAll(() => {
  server = new InversifyExpressServer(container);
  server.setConfig(app => {
    app.use(express.json());
  });
});

describe('ExpenseController', () => {
  it('should add an expense', async () => {
    const response = await request(server.build())
      .post('/expenses')
      .send({ userId: 1, amount: 100, category: 'Food', description: 'Dinner', date: '2023-01-01' });
    
    expect(response.status).toBe(201);
    expect(mockExpenseService.addExpense).toHaveBeenCalled();
  });

  it('should get expenses', async () => {
    const mockExpenses = [{ id: 1, userId: 1, amount: 100, category: 'Food', description: 'Dinner', date: '2023-01-01' }];
    (mockExpenseService.getExpenses as jest.Mock).mockResolvedValue(mockExpenses);

    const response = await request(server.build())
      .get('/expenses')
      .send({ userId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockExpenses);
    expect(mockExpenseService.getExpenses).toHaveBeenCalled();
  });
});
