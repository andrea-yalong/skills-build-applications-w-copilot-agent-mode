import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ workouts: [] });
});

router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ id: 'workout_1', ...payload });
});

export default router;
