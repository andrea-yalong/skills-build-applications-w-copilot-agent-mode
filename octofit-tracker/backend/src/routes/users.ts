import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const user = await User.create(payload);
  res.status(201).json(user);
});

export default router;
