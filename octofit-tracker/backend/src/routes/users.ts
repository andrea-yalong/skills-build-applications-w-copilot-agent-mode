import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  const payload = req.body;
  res.status(201).json({ id: 'user_1', ...payload });
});

export default router;
