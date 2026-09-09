// Manual mock for ../nats-wrapper, activated by `jest.mock('../nats-wrapper')`
// in src/test/setup.ts.
//
// The real wrapper's `client` getter throws when nothing has connected, and the
// route handlers reach for it on every create/update. express-async-errors
// forwards that throw to the common errorHandler, whose non-CustomError branch
// answers 400 — which is why these routes returned 400 instead of 201/200 with
// no NATS server in the test environment.
//
// `publish` is a jest.fn so tests can assert an event was emitted; it invokes
// the callback with no error, matching how the real Stan client signals success.
export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      )
  }
};
