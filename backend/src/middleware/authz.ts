import { RequestHandler } from 'express';
import { JwtPayload } from '../services/authService';

export const requireRole = (role: 'learner' | 'admin'): RequestHandler => (req, res, next) => {
  const user = (req as any).user as JwtPayload | undefined;
  if (!user || user.role !== role) return res.sendStatus(403);
  next();
};