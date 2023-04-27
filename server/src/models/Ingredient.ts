import mongoose, { Document, Schema } from 'mongoose';

export interface IIngredient extends Document {
    text: string;
}

const IngredientSchema: Schema = new Schema({
    text: { type: String, required: true }
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
