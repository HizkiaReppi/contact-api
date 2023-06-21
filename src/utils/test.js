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

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      userId: 'test-id',
      first_name: 'test',
      last_name: 'test',
      email: 'test@gmail.com',
      phone: '082345678910',
    },
  });
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      userId: 'test-id',
    },
  });
};

export const createManyTestContacts = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        userId: 'test-id',
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `0823456789${i}`,
      },
    });
  }
};
