import jwt from 'jsonwebtoken';
import { userRepo } from '../data/repositories/userRepo';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
export interface JwtPayload { id: string; role: 'learner' | 'admin'; }

// src/services/authService.ts
export const authService = {
  login(email: string, password: string) {            // ← no async
    const user = userRepo.findByEmail(email);
    if (!user || password !== user.password) return null;

    const token = jwt.sign(
      { id: user.id, role: user.role } as JwtPayload,
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { token , user};
  },
  verify: (token: string) => jwt.verify(token, JWT_SECRET) as JwtPayload
};
