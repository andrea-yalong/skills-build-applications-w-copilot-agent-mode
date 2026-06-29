import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const HOST = process.env.HOST || '0.0.0.0';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const app = express();
app.use(express.json());

// Simple CORS handling with Codespaces-aware origin support
app.use((req, res, next) => {
  const allowedOrigin = CODESPACE_NAME ? `https://${CODESPACE_NAME}-${PORT}.githubpreview.dev` : '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

// Mount API routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function connectWithRetry(uri: string, retries = 5, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      return;
    } catch (err) {
      console.warn(`MongoDB connection attempt ${i + 1} failed. Retrying in ${delayMs}ms...`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Could not connect to MongoDB after retries');
}

async function start() {
  try {
    await connectWithRetry(MONGO_URL);
    console.log('Connected to MongoDB at', MONGO_URL);

    const publicUrl = CODESPACE_NAME ? `https://${CODESPACE_NAME}-${PORT}.githubpreview.dev` : `http://localhost:${PORT}`;
    app.listen(PORT, HOST, () => {
      console.log(`Server listening on ${HOST}:${PORT}`);
      console.log(`API available at ${publicUrl}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
