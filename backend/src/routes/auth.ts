import { Router } from 'express';
import { authService } from '../services/authService';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const result = authService.login(email, password);
  if (!result) return res.status(401).json({ message: 'Invalid email or password' });
  res.json(result);
});

export default router;