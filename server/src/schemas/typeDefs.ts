import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Ingredient {
        _id: ID!
        text: String
    }

    type Direction {
        _id: ID!
        text: String
    }

    type Recipe {
        _id: ID!
        name: String
        ingredients: [Ingredient]
        directions: [Direction]
    }

    type Query {
        getRecipes: [Recipe]
        getRecipeById(recipeId: ID!): Recipe
    }

    type Mutation {
        addRecipe(name: String!, ingredients: [IngredientsInput]!, directions: [DirectionsInput]!): Recipe
    }

    input IngredientsInput {
        text: String
    }

    input DirectionsInput {
        text: String
    }
`;

export default typeDefs;
