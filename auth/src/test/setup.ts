import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

// Create new instance of MongoDB in memory before tests run

// Allows us to run multiple different test suites across
// projects without them all using a single instance

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdkfj'

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
      await collection.deleteMany({});
  }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})