import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
    email: string;
    password: string;
}

// Interface that describes the properties
// that a user model has
// Will let Typescript know that there is now a build property
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties
// that a single User Document has
// Would add extra properties here if we deicde
// to have more
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        // Referring to an actual Javascript constructor
        // So needs to be capitalized
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // Massaging data that is returned to the user
    // to standardize across services
    //
    // Consider moving this to view level logic in a typical MVC
    toJSON: {
        transform(doc, ret) {
            // Get rid of Mongo _id syntax
            // For similar syntax to other potential DBs in the app
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

// When writing a middleware function,
// using an arrow => function would overwrite
// "this" inside the function and would be equal
// to the context of the entire file
userSchema.pre('save', async function(done) {
    // will return true even if being created for first time
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    // Mongoose doesn't have great out of the box
    // support for async functions

    // So we are responsible for letting
    // mongoose know when we're done
    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Need to make sure Typescript is able to check the type of arguments
// we're passing into the user constructor

// Mongoose doesn't make this easy
// For example, new User({email: 'test@test.com', password: 'blah'})
// Can't do effective type checking with Typscript when using the standard way

// Allows Typescript to be aware of the required arguments for the "new User()" function
// And now does type checking, example below
// And can get access properties safely, example:
//
// const user = User.build({
//   email: 'test@test.com',
//   password: 'blah'
// })

// Another problem is that the properties that we pass to use User constructor 
// don't necessarily match up with the properties available on a user

export { User };