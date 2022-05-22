import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    // Does this user have a 'req.session.jwt' set?
    // Below is equivalent to if (!req.session || !req.session.jwt)
    if (!req.session?.jwt) {
        // If it is not set, or if the JWT is invalid, return early
        return res.send({ currentUser: null });
    }

    // If yes, and JWT is valid, send back
    // info stored inside the JWT (payload)
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        );
        res.send({ currentUser: payload });
    }   catch (err) {
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };