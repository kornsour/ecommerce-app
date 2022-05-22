// Middleware to extract the JWT payload and set it on 'req.currentUser'

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