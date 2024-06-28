import { Container } from 'inversify';
import { TYPES } from '../types';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUserService } from '../interfaces/user-service.interface';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';
import { IExpenseService } from '../interfaces/expense-service.interface';
import { ExpenseRepository } from '../repositories/expense.repository';
import { ExpenseService } from '../services/expense.service';
import { Pool } from 'mysql2/promise';
import { createPool } from 'mysql2';

const container = new Container();

// Create MySQL pool
const pool: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'expense_tracker',
});

// Bind MySQL pool
container.bind<Pool>(TYPES.Pool).toConstantValue(pool);

// Bind user repository and service
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);

// Bind expense repository and service
container.bind<IExpenseRepository>(TYPES.ExpenseRepository).to(ExpenseRepository);
container.bind<IExpenseService>(TYPES.ExpenseService).to(ExpenseService);

export { container };
