import { injectable, inject } from 'inversify';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { TYPES } from '../types';
import { User } from '../models/user';
import { IUserService } from '../interfaces/user-service.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    await this.userRepository.create(newUser);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
  }

  // Add other necessary methods
}
