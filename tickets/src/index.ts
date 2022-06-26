import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper'

const start = async () => {
    // Make sure env variables have been set on startup
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        // cluster ID defined in k8s deployment
        // service url defined in k8s deployment
        await natsWrapper.connect('ticketing', 'alsdkfj', 'http://nats-srv:4222' );
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
};

start();
