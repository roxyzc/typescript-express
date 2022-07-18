import express, { Router } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import routerAuthor from './routes/Author';
import routerBook from './routes/Book';

const app = express();

// connect to Mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to mongoDB');
        StartServer();
    })
    .catch((err) => {
        Logging.error('unable to connect:');
        Logging.error(err);
    });

// only start the server if mongo connects
const StartServer = () => {
    app.use((req, res, next) => {
        // log the request
        Logging.info(`Incomming -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // log the response
            Logging.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // rules of our API
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    app.use('/authors', routerAuthor);
    app.use('/books', routerBook);

    // HealthCheck
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'PONG' }));

    // error handling
    app.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
