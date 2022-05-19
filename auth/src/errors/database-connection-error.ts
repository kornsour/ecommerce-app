import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        // For logging purposes
        super('Error to connecting to db');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}