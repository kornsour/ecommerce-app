import { Publisher, Subjects, TicketCreatedEvent } from '@kornorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    // readonly ensures subject is not allowed to change at any point in time
    readonly subject = Subjects.TicketCreated
}