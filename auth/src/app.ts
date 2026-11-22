import express, { json } from 'express';
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

// Express 5 (path-to-regexp 8) no longer accepts a bare '*'; a wildcard must
// be named. '/{*splat}' also matches '/'.
app.all('/{*splat}', async (req, res) => {
    // Express 5 forwards a rejected promise from an async handler to the
    // error handler itself, so express-async-errors is no longer needed.
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };