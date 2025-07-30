// src/routes/learner/index.ts
import { Router } from 'express';

import profileRoutes        from './profile';
import assessmentRoutes     from './assessment';
import recommendationRoutes from './recommendations';
import trackerRoutes        from './tracker';
import dashboardRoutes      from './dashboard';

const router = Router();

router.use('/profile',    profileRoutes);        // /learner/profile/:userId
router.use('/assessment', assessmentRoutes);     // /learner/assessment/...
router.use('/path',       recommendationRoutes); // /learner/path/:userId
router.use('/tracker',    trackerRoutes);        // /learner/tracker/...
router.use('/dashboard',  dashboardRoutes);      // /learner/dashboard/:userId

export default router;
