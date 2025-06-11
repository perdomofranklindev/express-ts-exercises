import { PrismaClient } from '@prisma/client';
import app from '../app';

const prisma = new PrismaClient();

// Mock data that matches your auth schemas
export const mockUsers = [
  {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'Password123!',
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Admin123!',
  },
];

// Setup before all tests
beforeAll(async () => {
  // Clean up the database before all tests
  await prisma.user.deleteMany();
});

// Clean up after each test
afterEach(async () => {
  await prisma.user.deleteMany();
});

// Clean up after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

export { app, prisma };
