import { Schema, model, Document, Types } from 'mongoose';
import IRegion from './Region';

export interface IState extends Document {
  name: string;
 region: Schema.Types.ObjectId;
  metadata: string;
  LGAs?: string[];
}

const stateSchema = new Schema<IState>({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
  metadata: { type: String, required: true },
});

const State = model<IState>('State', stateSchema);

export default State;