import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@kornorg/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
// Make Express aware that it should trust traffic
// from behind ingress nginx we're using
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        // disabling encryption because 
        // json web tokens are already encrypted
        signed: false,
        // requires https connection if true
        // Jest sets env var to test on run
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    // works because of express-async-error module
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };