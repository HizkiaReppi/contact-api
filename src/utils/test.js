import bcrypt from 'bcrypt';
import { prismaClient } from './database.js';

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test',
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: await bcrypt.hash('test123', 10),
      token: 'test-token',
    },
  });
};
