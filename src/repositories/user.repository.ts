import { injectable, inject } from 'inversify';
import { User } from '../models/user';
import { Pool } from 'mysql2/promise';
import { TYPES } from '../types';
import { IUserRepository } from '../interfaces/user-repository.interface';

@injectable()
export class UserRepository implements IUserRepository {
  private pool: Pool;

  constructor(@inject(TYPES.Pool) pool: Pool) {
    this.pool = pool;
  }

  async create(user: User): Promise<void> {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await this.pool.execute(query, [user.username, user.email, user.password]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await this.pool.execute(query, [email]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  // Add other necessary methods
}
