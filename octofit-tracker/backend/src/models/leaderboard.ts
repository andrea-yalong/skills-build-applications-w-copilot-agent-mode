import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  points: number;
  rank: number;
  updatedAt?: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  updatedAt: { type: Date, default: () => new Date() }
});

export default model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
