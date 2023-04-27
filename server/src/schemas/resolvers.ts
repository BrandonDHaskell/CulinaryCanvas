import { AuthenticationError } from 'apollo-server-express';
import { Recipe, Ingredient, Direction } from '../models';
import { IResolvers } from '@graphql-tools/utils';
import Logger from '../library/Logger';

const resolvers: IResolvers = {
    Query: {
        getRecipes: async (parent, { limit, skip }) => {
            Logger.info('Request getRecipes');
            return await Recipe.find().populate('ingredients').populate('directions');
        },
        getRecipeById: async (parent, { recipeId }) => {
            Logger.info('Request getRecipeById: ' + recipeId);
            return await Recipe.findById(recipeId).populate('ingredients').populate('directions');
        }
    },
    Mutation: {
        addRecipe: async (parent, recipe) => {
            Logger.info(`New recipe submitted`);
            if (recipe.name && recipe.ingredients && recipe.directions) {
                let ingredients = [];
                let directions = [];

                // Create ingredients list
                for (let i = 0; i < recipe.ingredients.length; i++) {
                    const ingredient = new Ingredient({ text: recipe.ingredients[i].text });
                    await ingredient.save();
                    Logger.info(`New recipe ingredient added: ${ingredient._id}`);
                    ingredients.push(ingredient._id);
                }

                // Create directions list
                for (let i = 0; i < recipe.directions.length; i++) {
                    const direction = new Direction({ text: recipe.directions[i].text });
                    await direction.save();
                    Logger.info(`New recipe direction added: ${direction._id}`);
                    directions.push(direction._id);
                }

                const newRecipe = new Recipe({
                    name: recipe.name,
                    ingredients,
                    directions
                });

                await newRecipe.save();
                Logger.info(`New recipe added: ${newRecipe._id}`);

                return await Recipe.findById(newRecipe._id).populate('ingredients').populate('directions');
            } else {
                Logger.error(`Incomplete recipe submitted!`);
                Logger.error(recipe);
            }
        }
    }
};

export default resolvers;
