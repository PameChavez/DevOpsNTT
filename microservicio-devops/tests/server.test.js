// tests/server.test.js
const request = require('supertest');
const app = require('../src/server');

describe('DevOps Endpoint', () => {
  const validApiKey = '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c';
  const validBody = {
    message: "This is a test",
    to: "Juan Perez",
    from: "Rita Asturia",
    timeToLifeSec: 45
  };

  it('should return 200 and correct message for valid POST requests', async () => {
    const response = await request(app)
      .post('/DevOps')
      .set('X-Parse-REST-API-Key', validApiKey)
      .send(validBody);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Hello Juan Perez your message will be sent"
    });
    expect(response.headers['x-jwt-kwy']).toBeDefined();
  });

  it('should return ERROR for requests without valid API key', async () => {
    const response = await request(app)
      .post('/DevOps')
      .send(validBody);
    
    expect(response.status).toBe(401);
    expect(response.text).toBe('ERROR');
  });

  it('should return ERROR for non-POST requests', async () => {
    const response = await request(app)
      .get('/DevOps')
      .set('X-Parse-REST-API-Key', validApiKey);
    
    expect(response.status).toBe(405);
    expect(response.text).toBe('ERROR');
  });

  it('should return ERROR for invalid body', async () => {
    const response = await request(app)
      .post('/DevOps')
      .set('X-Parse-REST-API-Key', validApiKey)
      .send({ incomplete: 'body' });
    
    expect(response.status).toBe(400);
    expect(response.text).toBe('ERROR');
  });
});