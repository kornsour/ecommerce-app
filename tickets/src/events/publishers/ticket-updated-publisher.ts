import { Publisher, Subjects, TicketUpdatedEvent } from '@kornorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    // readonly ensures subject is not allowed to change at any point in time
    readonly subject = Subjects.TicketUpdated
}