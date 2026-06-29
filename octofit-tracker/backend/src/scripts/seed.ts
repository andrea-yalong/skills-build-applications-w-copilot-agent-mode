/**
 * Seed the octofit_db database with test data
 *
 * Run with: `npm run seed` from the backend folder
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URL);
  console.log('Connected to', MONGO_URL);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  // Activities
  const [running, cycling, yoga] = await Activity.create([
    { name: 'Running', met: 10 },
    { name: 'Cycling', met: 8 },
    { name: 'Yoga', met: 3 }
  ]);

  // Teams
  const [red, blue] = await Team.create([
    { name: 'Red Rockets', members: [], totalPoints: 0 },
    { name: 'Blue Whales', members: [], totalPoints: 0 }
  ]);

  // Users
  const [alice, bob, carol, dave] = await User.create([
    { name: 'Alice Johnson', email: 'alice@example.com', team: red._id, points: 420 },
    { name: 'Bob Smith', email: 'bob@example.com', team: red._id, points: 380 },
    { name: 'Carol Lee', email: 'carol@example.com', team: blue._id, points: 500 },
    { name: 'Dave Kim', email: 'dave@example.com', team: blue._id, points: 300 }
  ]);

  // update teams members and totals
  red.members = [alice._id!, bob._id!];
  red.totalPoints = alice.points + bob.points;
  blue.members = [carol._id!, dave._id!];
  blue.totalPoints = carol.points + dave.points;
  await red.save();
  await blue.save();

  // Workouts
  await Workout.create([
    { user: alice._id!, team: red._id!, activity: running._id!, durationMinutes: 45, calories: 450, date: new Date() },
    { user: bob._id!, team: red._id!, activity: cycling._id!, durationMinutes: 60, calories: 600, date: new Date() },
    { user: carol._id!, team: blue._id!, activity: yoga._id!, durationMinutes: 30, calories: 120, date: new Date() },
    { user: dave._id!, team: blue._id!, activity: running._id!, durationMinutes: 30, calories: 300, date: new Date() }
  ]);

  // Leaderboard entries
  const leaderboardEntries = [
    { user: carol._id!, points: carol.points, rank: 1 },
    { user: alice._id!, points: alice.points, rank: 2 },
    { user: bob._id!, points: bob.points, rank: 3 },
    { user: dave._id!, points: dave.points, rank: 4 }
  ];

  await Leaderboard.create(leaderboardEntries);

  // Verify inserted data via model counts
  const [uCount, tCount, aCount, wCount, lCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments()
  ]);

  console.log('Inserted:', { users: uCount, teams: tCount, activities: aCount, workouts: wCount, leaderboard: lCount });

  await mongoose.disconnect();
  console.log('Disconnected. Seed complete.');
}

seed().catch(err => {
  console.error('Seed failed', err);
  process.exit(1);
});
