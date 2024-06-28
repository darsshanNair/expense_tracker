import { User } from '../models/user';

export interface IUserService {
  register(user: User): Promise<void>;
  login(email: string, password: string): Promise<string>;
  // Add other necessary methods
}
