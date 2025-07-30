import { Router } from 'express';
import { recommendationService } from '../../services/recommendationService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('learner'));

// GET /learner/path/me
router.get('/me', (req, res) => {
  const path = recommendationService.getPath(req.user!.id);
  path ? res.json(path) : res.sendStatus(404);
});

export default router;