import { Router } from 'express';
import { assessmentService } from '../../services/assessmentService';
import { requireRole } from '../../middleware/authz';

const router = Router();
router.use(requireRole('learner'));

// POST /learner/assessment/start
router.post('/start', (req, res) => {
  const { difficulty } = req.body as { difficulty: 'beginner' | 'intermediate' | 'advanced' };
  const a = assessmentService.start(req.user!.id, difficulty);
  res.status(201).json(a);
});

// POST /learner/assessment/:assessmentId/answer
router.post('/:assessmentId/answer', (req, res) => {
  const { questionId, selectedAnswer, timeSpent } = req.body as {
    questionId: string;
    selectedAnswer: number;
    timeSpent: number;
  };
  const a = assessmentService.answer(req.params.assessmentId, questionId, selectedAnswer, timeSpent);
  a ? res.json(a) : res.sendStatus(404);
});

// POST /learner/assessment/:assessmentId/finish
router.post('/:assessmentId/finish', (req, res) => {
  const a = assessmentService.finish(req.params.assessmentId);
  a ? res.json(a) : res.sendStatus(404);
});

export default router;