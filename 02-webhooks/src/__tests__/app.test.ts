import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  it('GET / - should return basic response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Express + TypeScript Server');
  });

  it('GET /api/test - should return test message', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Test endpoint working!');
  });

  it('POST /api/greet - should greet with provided name', async () => {
    const res = await request(app).post('/api/greet').send({ name: 'John' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello, John!');
  });

  it('POST /api/greet - should return error for missing name', async () => {
    const res = await request(app).post('/api/greet').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Name is required');
  });
});
