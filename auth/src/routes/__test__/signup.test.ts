// Supertest allows us to fake a request to Express app

// Supertest uses HTTP, not HTTPS
// Because we want to test cookies, need to set the "secure" option in app.ts
// to an env var that changes to "false" when using jest

import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'lakjsdflj',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'alskjdffs'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password:'password'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password:'password'
      })
      .expect(400);
      
});

// This will fail unless 'secure' option for cookieSession
// is set to false in app.ts
it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password:'password'
      })
      .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});