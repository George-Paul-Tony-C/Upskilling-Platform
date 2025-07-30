import { Router } from 'express';
import dashboardRoutes from './dashboard';
import usersRoutes     from './users';
import { requireRole } from '../../middleware/authz';
import { adminService } from '../../services/adminService';

const router = Router();
router.use(requireRole('admin'));

router.use('/dashboard', dashboardRoutes);  // /admin/dashboard
router.use('/users',     usersRoutes);      // /admin/users...

// quick existing passthroughs remain for backwards‑compat
router.get('/agents',    (_, res) => res.json(adminService.agentStatus()));
router.get('/analytics', (_, res) => res.json(adminService.analytics()));

export default router;