import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@kornorg/common';

import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signin', 
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }

    const passwordsMatch = await Password.compare(
      existingUser.password, 
      password
    );

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }
    
    // Generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
        },
        // Exclamation tells TS we've already checked
        // that this variable is defined somewhere else
        process.env.JWT_KEY!
    );

    // Store JWT on session object
    // In TS, instead of trying to set a property,
    // redefine the entire object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };