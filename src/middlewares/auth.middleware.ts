import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).send('Access denied. No token provided.');
    return;
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.body.userId = (decoded as any).userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}
