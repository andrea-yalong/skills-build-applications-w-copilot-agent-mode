import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  _id?: Types.ObjectId;
  name: string;
  members: Types.ObjectId[];
  totalPoints: number;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 }
});

export default model<ITeam>('Team', TeamSchema);
