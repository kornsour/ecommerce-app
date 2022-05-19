// Sets up requirements for subclasses
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        // More or less equivalent to calling new Error
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[]
}