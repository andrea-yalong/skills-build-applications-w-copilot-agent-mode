import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  _id?: Types.ObjectId;
  name: string;
  met: number; // metabolic equivalent
}

const ActivitySchema = new Schema<IActivity>({
  name: { type: String, required: true },
  met: { type: Number, default: 6 }
});

export default model<IActivity>('Activity', ActivitySchema);
