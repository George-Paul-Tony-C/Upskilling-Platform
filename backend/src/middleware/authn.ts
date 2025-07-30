import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = header.slice(7);
  try {
    (req as any).user = authService.verify(token);
    next();
  } catch {
    res.sendStatus(401);
  }
};