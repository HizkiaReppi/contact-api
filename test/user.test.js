import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import { logger } from '../src/utils/logging.js';
import { createTestUser, removeTestUser } from '../src/utils/test.js';

describe('POST /api/users/register', () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(server).post('/api/users/register').send({
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: 'test123',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Register Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
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
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: 'test123',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Register Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(server).post('/api/users/register').send({
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: 'test123',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBe('Username already exists');
  });
});

describe('POST /api/users/login', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'test',
      password: 'test123',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Login Success');
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test-token');
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: '',
      password: '',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'test',
      password: 'wrongTest',
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Username or password wrong');
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'wrongUsername',
      password: 'wrongTest',
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Username or password wrong');
  });
});

describe('GET /api/users/current', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(server)
      .get('/api/users/current')
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe('true');
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Get Data Success');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(server)
      .get('/api/users/current')
      .set('Authorization', 'tokenInvalid');

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
  });
});
