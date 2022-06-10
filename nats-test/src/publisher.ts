import nats from 'node-nats-streaming';

console.clear();

// set client
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// executed once the client is connected to the server
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  // NATS can only share strings (raw data)
  const data = JSON.stringify({
      id: '123',
      title: 'concert',
      price: 20
  });

  stan.publish('ticket:created', data, () => {
      console.log('Event published');
  });
});