import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// sets new global signin funcion for TypeScript
declare global {
  var getAuthCookie: () => Promise<string[]>;
}

// Create new instance of MongoDB in memory before tests run

// Allows us to run multiple different test suites across
// projects without them all using a single instance

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdkfj'

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, { runtimeAdapters: { os: require('os') } });
});

beforeEach(async () => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('MongoDB connection is not established');
  }

  const collections = await db.collections();
  for (let collection of collections) {
      await collection.deleteMany({});
  }
});

afterAll(async () => {
    // Close the client before stopping the server: with the Mongoose 9 driver,
    // stopping the server first leaves the client reconnecting and can hang.
    await mongoose.connection.close();
    await mongo.stop();
});

global.getAuthCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, 
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  
  return cookie;
};