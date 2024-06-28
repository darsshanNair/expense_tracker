import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { IUserService } from '../interfaces/user-service.interface';
import { TYPES } from '../types';
import { inject } from 'inversify';
import { check, validationResult } from 'express-validator';

@controller('/users')
export class UserController {
  private userService: IUserService;

  constructor(@inject(TYPES.UserService) userService: IUserService) {
    this.userService = userService;
  }

  @httpPost('/register', [
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
  ])
  async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, email, password } = req.body;
    try {
      await this.userService.register({ id: 0, username, email, password });
      res.status(201).send('User registered successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @httpPost('/login', [
    check('email').isEmail(),
    check('password').exists()
  ])
  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    try {
      const token = await this.userService.login(email, password);
      res.json({ token });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}
