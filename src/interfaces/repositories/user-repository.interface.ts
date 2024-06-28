import { User } from '../models/user';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  // Add other necessary methods
}
