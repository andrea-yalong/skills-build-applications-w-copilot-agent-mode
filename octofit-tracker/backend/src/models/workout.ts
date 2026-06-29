import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  team?: Types.ObjectId | null;
  activity: Types.ObjectId;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  activity: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
});

export default model<IWorkout>('Workout', WorkoutSchema);
