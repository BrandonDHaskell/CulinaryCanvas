import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Logger from '../library/Logger';

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/CulinaryCanvas-db';

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions;

async function connectToDB(): Promise<mongoose.Connection> {
    try {
        await mongoose.connect(MONGODB_URL, connectionOptions);
        Logger.info(`Connected to: ${mongoose.connection.name}, PORT: ${mongoose.connection.port}, readyState: ${mongoose.connection.readyState}`);
        return mongoose.connection;
    } catch (error) {
        Logger.error('Unable to connect to database');
        throw error;
    }
}

async function disconnectFromDB(): Promise<void> {
    try {
        await mongoose.disconnect();
        Logger.info(`Disconnected from database`);
    } catch (error) {
        Logger.error('Error disconnecting from database');
        throw error;
    }
}

export { connectToDB, disconnectFromDB };
