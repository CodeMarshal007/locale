import { Schema, Document, model } from 'mongoose';
import { IState } from './State';

export interface ILGA extends Document {
  name: string;
  state: IState['_id'];
  metadata: string;
}

const lgaSchema = new Schema<ILGA>({
  name: { type: String, required: true },
  state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  metadata: { type: String, required: true },
});

export default model<ILGA>('LGA', lgaSchema);
