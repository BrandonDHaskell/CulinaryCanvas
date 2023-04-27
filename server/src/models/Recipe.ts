import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe extends Document {
    name: string;
    ingredients: string[];
    directions: string[];
}

const RecipeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        ingredients: [{ type: Schema.Types.ObjectId, required: true, ref: 'Ingredient' }],
        directions: [{ type: Schema.Types.ObjectId, required: true, ref: 'Direction' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
