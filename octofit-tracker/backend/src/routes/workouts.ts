import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user activity team').lean();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const workout = await Workout.create(payload);
  res.status(201).json(workout);
});

export default router;
