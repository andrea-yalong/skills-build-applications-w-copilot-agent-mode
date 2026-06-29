import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const activity = await Activity.create(payload);
  res.status(201).json(activity);
});

export default router;
