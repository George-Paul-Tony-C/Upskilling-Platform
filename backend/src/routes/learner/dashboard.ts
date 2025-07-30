// src/routes/learner/dashboard.ts
import { Router } from 'express';
import { learnerDashboardService } from '../../services/learnerDashboardService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('learner'));

// GET /learner/dashboard/me
router.get('/me', (req, res) => {
  const dash = learnerDashboardService.get(req.user!.id);
  dash ? res.json(dash) : res.sendStatus(404);
});

export default router;
