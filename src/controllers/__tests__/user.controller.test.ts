import 'reflect-metadata';
import request from 'supertest';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from '../../types';
import { UserController } from '../user.controller';
import { IUserService } from '../../interfaces/user-service.interface';
import { UserService } from '../../services/user.service';

// Mock the UserService
const mockUserService: Partial<IUserService> = {
  register: jest.fn(),
  login: jest.fn()
};

const container = new Container();
container.bind<IUserService>(TYPES.UserService).toConstantValue(mockUserService as IUserService);

let server: InversifyExpressServer;

beforeAll(() => {
  server = new InversifyExpressServer(container);
  server.setConfig(app => {
    app.use(express.json());
  });
});

describe('UserController', () => {
  it('should register a user', async () => {
    const response = await request(server.build())
      .post('/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    
    expect(response.status).toBe(201);
    expect(mockUserService.register).toHaveBeenCalled();
  });

  it('should login a user', async () => {
    const mockToken = 'mockToken';
    (mockUserService.login as jest.Mock).mockResolvedValue(mockToken);

    const response = await request(server.build())
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe(mockToken);
    expect(mockUserService.login).toHaveBeenCalled();
  });
});
