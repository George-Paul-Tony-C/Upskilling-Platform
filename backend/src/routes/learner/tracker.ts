import { Router } from 'express';
import { trackerService } from '../../services/trackerService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('learner'));

// GET /learner/tracker/latest-assessment
router.get('/latest-assessment', (req, res) => {
  const a = trackerService.latestAssessment(req.user!.id);
  a ? res.json(a) : res.sendStatus(404);
});

export default router;