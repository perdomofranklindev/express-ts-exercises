import request from 'supertest';
import { app, mockUsers, prisma } from './test-setup';
import { hash } from 'bcrypt';

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/sign-up', () => {
    it('should register a new user', async () => {
      const response = await request(app).post('/api/auth/sign-up').send(mockUsers[0]);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email', mockUsers[0].email);
      expect(response.body).toHaveProperty('firstName', mockUsers[0].firstName);
      expect(response.body).toHaveProperty('lastName', mockUsers[0].lastName);
    });

    it('should not register a user with existing email', async () => {
      // First create a user
      const hashedPassword = await hash(mockUsers[0].password, 10);
      await prisma.user.create({
        data: {
          ...mockUsers[0],
          password: hashedPassword,
        },
      });

      // Try to create the same user again
      const response = await request(app).post('/api/auth/sign-up').send(mockUsers[0]);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/sign-in', () => {
    beforeEach(async () => {
      // Create a user before each test
      const hashedPassword = await hash(mockUsers[0].password, 10);
      await prisma.user.create({
        data: {
          ...mockUsers[0],
          password: hashedPassword,
        },
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app).post('/api/auth/sign-in').send({
        email: mockUsers[0].email,
        password: mockUsers[0].password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email', mockUsers[0].email);
      expect(response.body).toHaveProperty('firstName', mockUsers[0].firstName);
      expect(response.body).toHaveProperty('lastName', mockUsers[0].lastName);
    });

    it('should not login with invalid password', async () => {
      const response = await request(app).post('/api/auth/sign-in').send({
        email: mockUsers[0].email,
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });
});
