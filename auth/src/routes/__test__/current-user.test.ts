import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
    // supertest doesn't pass the cookie from
    // the previous tests
    const cookie = await global.getAuthCookie();

    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com')

});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

    expect(response.body.currentUser).toEqual(null)
});