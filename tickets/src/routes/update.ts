import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError } from '@kornorg/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0')
    ],
    validateRequest, 
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        // requireAuth already verifies that user is defined
        // so we can use req.currentUser!
        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();

        res.send(ticket);
    }
);

export { router as updateTicketRouter };