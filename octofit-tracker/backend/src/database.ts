import mongoose from 'mongoose';

/**
 * Centralized Mongoose connection helper for octofit_db
 */
export async function connectToDatabase(uri?: string, retries = 5, delayMs = 2000) {
  const mongoUri = uri || process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      return mongoose;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`MongoDB connection attempt ${i + 1} failed. Retrying in ${delayMs}ms...`);
      // wait
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Could not connect to MongoDB after retries');
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export default { connectToDatabase, disconnectDatabase };
