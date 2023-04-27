import mongoose, { Document, Schema } from 'mongoose';

export interface IDirection extends Document {
    text: string;
}

const DirectionSchema: Schema = new Schema({
    text: { type: String, required: true }
});

export default mongoose.model<IDirection>('Direction', DirectionSchema);
