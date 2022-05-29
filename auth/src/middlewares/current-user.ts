// Middleware to extract the JWT payload and set it on 'req.currentUser'

// JSON Web tokens and cookies are NOT the same thing
//
// Cookies
//  - Transport mechanism
//  - Moves any kind of data between browser and server
//  - Automatically managed by the browser
// JWTs
//  - Authentication/Authorization mechanism
//  - Stores any data we want
//  - We have to manage them manually
//
// JWTs take a payload and convert it to a token
// Setting a JWT in a cookie allows the JWT token to be managed by the browser
// and included in all followup requests
// 
// We want the authentication to be easily understood between different languages
// Cookie handling across languages is usally an issue when we encrypt the data in the cookie
// 
// We will not encrypt the cookie contents
// Because JWTs are tamper resistant
//  - If a malicious user tries to modify the info in a JWT
//    we will see the jwt is invalid
//  - You should not be storing protected information inside a JWT or cookie
// 

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// Reach into an existing type definition
// and modify it
declare global {
    namespace Express {
        interface Request {
            // Add property that MIGHT be defined
            // For example, won't be if user is not logged in
            // And if defined, set it
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Make sure session is defined
    // and if it is, check jwt property is defined
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (err) {}

    next();
};