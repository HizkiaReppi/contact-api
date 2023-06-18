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
      id: 'test-id',
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: await bcrypt.hash('test123', 10),
      token: 'test-token',
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test',
    },
  });
};

export const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      userId: 'test-id',
    },
  });
};
