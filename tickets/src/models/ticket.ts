import mongoose from 'mongoose';

// Properties that are required to build a new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;

}

// Properties that a Ticket has
interface TicketDoc extends mongoose.Document {
  id: string;
  title: string;
  price: number;
  userId: string;
}

// Properties tied to the Model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title: {
        // referring to global String constructor in js
        type: String,
        required: true
    },
    price: {
        type: Number,
        requried: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            const { _id, ...ticket } = ret;
            return { ...ticket, id: _id };
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };