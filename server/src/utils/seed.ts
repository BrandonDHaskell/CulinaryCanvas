import { connectToDB, disconnectFromDB } from '../config/dbConnection';
import { Recipe, Ingredient, Direction } from '../models/index';
import Logger from '../library/Logger';

const recipes = [
    {
        name: 'Buttermilk Pancakes',
        ingredients: [
            { text: '1 3/4 cups flour' },
            { text: '1 tsp baking powder' },
            { text: '1 tsp baking soda' },
            { text: '1/2 tsp salt' },
            { text: '1/3 cup vegetable oil' },
            { text: '2 cups buttermilk' },
            { text: '2 eggs' }
        ],
        directions: [
            { text: 'Mix eggs, buttermilk, vegetable oil, salt, baking soda, and baking powder together.' },
            { text: 'Slowly add flour while mixing batter.' },
            { text: 'Pour batter onto skillet or fry pan' }
        ]
    },
    {
        name: 'Pizza',
        ingredients: [{ text: 'Dough' }, { text: 'Tomato sauce' }, { text: 'Cheese' }, { text: 'Pepperoni' }],
        directions: [{ text: 'Preheat oven to 475°F' }, { text: 'Roll out dough' }, { text: 'Add sauce, cheese, and toppings' }, { text: 'Bake for 12-15 minutes' }]
    },
    {
        name: 'Galic Butter Talipia',
        ingredients: [
            { text: '4 talapia filets' },
            { text: '1/2 tsp paprika' },
            { text: '1/2 tsp dried thyme' },
            { text: '1/2 tsp dried oregano' },
            { text: '4 tblsp butter' },
            { text: '2 tblsp lemon juice' },
            { text: '2 cloves garlic' },
            { text: '1/4 tsp lemon zest' },
            { text: 'Lemon slices (garnish)' },
            { text: 'Red pepper flakes (garnish)' },
            { text: 'Chopped parsley (garnish)' }
        ],
        directions: [
            { text: 'Preheat oven to 400°F.' },
            { text: 'Season tilapia with salt, pepper, paprika, thyme, and oregano; arrange fish in a 9x13 baking dish.' },
            { text: 'In a mixing bowl, whish together melted butter, garlic, lemon juice, and lemon zest; pour over tilapia.' },
            { text: 'Bake tilapia for 10 to 12 minutes, or until fish flakes and is fork-tender.' },
            { text: 'Garnish with pepper flakesm parsley, and lemon slices.' },
            { text: 'Serve.' }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await connectToDB();
        Logger.info(`Connected to mongo database`);

        Logger.info(`Dropping old data...`);
        await Recipe.deleteMany({});
        await Ingredient.deleteMany({});
        await Direction.deleteMany({});
        Logger.info(`Old data dropped`);

        Logger.info(`Beginning datatbase seeding...`);
        const seedPromises = recipes.map(async (recipe) => {
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
        });

        await Promise.all(seedPromises);
        Logger.info(`Database seeding complete`);
    } catch (error) {
        Logger.error(`Error while seeding database`);
        Logger.error(error);
    } finally {
        try {
            await disconnectFromDB();
            Logger.info('Database connection closed');
        } catch (error) {
            Logger.error('Error closing connection to database');
            console.log(error);
        } finally {
            process.exit(0);
        }
    }
};

Logger.info(`Connecting to database`);
seedDatabase();
