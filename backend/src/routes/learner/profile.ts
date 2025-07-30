// src/routes/learner/profile.ts
import { Router } from 'express';
import { learnerService } from '../../services/learnerService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('learner'));

// GET /learner/profile/me  (no userId param)
router.get('/me', (req, res) => {
  const uid = req.user!.id;
  const user = learnerService.getProfile(uid);
  user ? res.json(user) : res.sendStatus(404);
});

export default router;
