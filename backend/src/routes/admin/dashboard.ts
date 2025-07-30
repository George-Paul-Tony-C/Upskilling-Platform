import { Router } from 'express';
import { adminDashboardService } from '../../services/adminDashboardService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('admin'));

// GET /admin/dashboard
router.get('/', (_, res) => {
  res.json(adminDashboardService.get());
});

export default router;