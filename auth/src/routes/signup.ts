import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@kornorg/common';

import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      // Sanitization step
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      // Check if user exists
      if (existingUser) {
        throw new BadRequestError('Email in use');
      }

      // Create a new user and save to mongo db
      // Password is hashed in User model pre-save hook
      const user = User.build({ email, password });

      // Persists user to mongo db
      await user.save();

      // Generate JWT
      const userJwt = jwt.sign({
        id: user.id,
        email: user.email
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

      res.status(201).send(user);
  }
);

export { router as signupRouter };