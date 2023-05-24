import { Schema, model, Document, Types } from 'mongoose';

interface IRegion extends Document {
  name: string;
  states: Types.ObjectId[];
  metadata: string;
}

const regionSchema = new Schema<IRegion>({
  name: { type: String, required: true },
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  metadata: { type: String, required: true },
});

const Region = model<IRegion>('Region', regionSchema);

export default Region