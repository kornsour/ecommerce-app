// scrypt will be used for hashing
// however it is callback based

// so we use promisify to convert
// the callback based function into
// a promise based implementation
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    // Static methods are accessible without
    // creating an instance of the class
    static async toHash(password: string) {
        // generate random string
        const salt = randomBytes(8).toString('hex');

        // set buffer and tell Typescript that it's
        // of type buffer
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        // join hashed password and salt
        return `${buf.toString('hex')}.${salt}`;

    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;
    }
}