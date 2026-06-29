import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  team?: Types.ObjectId | null;
  points: number;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IUser>('User', UserSchema);
