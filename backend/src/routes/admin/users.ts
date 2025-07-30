import { Router } from 'express';
import { userRepo } from '../../data/repositories/userRepo';
import { requireRole } from '../../middleware/authz';
import { v4 as uuid } from 'uuid';

const router = Router();
router.use(requireRole('admin'));

// GET /admin/users           → list
router.get('/', (_, res) => res.json(userRepo.findAll()));

// GET /admin/users/:id       → single
router.get('/:id', (req, res) => {
  const u = userRepo.findById(req.params.id);
  u ? res.json(u) : res.sendStatus(404);
});

// POST /admin/users          → create minimal user
router.post('/', (req, res) => {
  const { name, email, department, role = 'learner' } = req.body;
  const id = uuid();
  const now = new Date();
  const newUser = {
    id,
    name,
    email,
    department,
    role,
    password: 'changeme',
    workflowStatus: { profileLoaded: false, assessmentPending: true, assessmentCompleted: false, recommendationsGenerated: false, learningInProgress: false, currentStep: 1, lastUpdated: now }
  };
  userRepo.findAll().push(newUser as any); // quick mock insert
  res.status(201).json(newUser);
});

// PUT /admin/users/:id       → update (shallow merge)
router.put('/:id', (req, res) => {
  const user = userRepo.findById(req.params.id);
  if (!user) return res.sendStatus(404);
  Object.assign(user, req.body, { id: user.id });
  res.json(user);
});

// DELETE /admin/users/:id
router.delete('/:id', (req, res) => {
  const all = userRepo.findAll();
  const idx = all.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.sendStatus(404);
  all.splice(idx, 1);
  res.sendStatus(204);
});

export default router;