import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import { prismaClient } from '../src/utils/database.js';
import { logger } from '../src/utils/logging.js';

describe('POST /api/users', () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: 'admin',
      },
    });
  });

  it('should can register new user', async () => {
    const result = await supertest(server).post('/api/users/register').send({
      username: 'admin',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Register Success');
    expect(result.body.data.username).toBe('admin');
    expect(result.body.data.name).toBe('Admin');
    expect(result.body.data.email).toBe('admin@gmail.com');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(server).post('/api/users/register').send({
      username: '',
      name: '',
      email: '',
      password: '',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username already exists', async () => {
    let result = await supertest(server).post('/api/users/register').send({
      username: 'admin',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Register Success');
    expect(result.body.data.username).toBe('admin');
    expect(result.body.data.name).toBe('Admin');
    expect(result.body.data.email).toBe('admin@gmail.com');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(server).post('/api/users/register').send({
      username: 'admin',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBe('Username already exists');
  });
});
