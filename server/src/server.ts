import dotenv from 'dotenv';
dotenv.config();

import { ApolloError, ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { connectToDB } from './config/dbConnection';
import schema from './schemas/index';
import Logger from './library/Logger';

Logger.info('Getting port number');
const PORT = process.env.PORT || 3001;

Logger.info('Creating Express application');
const app = express();

Logger.info('Creating ApolloServer with Schema');
const server = new ApolloServer(schema);

const startServer = async () => {
    try {
        await server.start();
        Logger.info('Server started');

        server.applyMiddleware({ app });
        Logger.info('Middleware applied');

        // For testing purposes
        app.get('/', (req: Request, res: Response) => {
            const queryParam = req.query?.name;
            const message = queryParam ? `Hello, ${queryParam}!` : `Hello world!`;
            res.send(message);
        });

        Logger.info(`Connecting to database`);
        await connectToDB();

        app.listen(PORT, () => {
            Logger.info(`Sever listening on PORT ${PORT}`);
        });
    } catch (error) {
        Logger.error('Error starting server');
        Logger.error(error);
    }
};

Logger.info('Starting server');
startServer();
