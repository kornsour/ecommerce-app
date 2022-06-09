import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// sets new global signin funcion for TypeScript
declare global {
  var getAuthCookie: () => string[];
}

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
});

global.getAuthCookie = () => {
  // Build a JWT payload for a unique user
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string of a cookie with the encoded data
  return [`session=${base64}`];
};