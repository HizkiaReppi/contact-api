import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { server } from '../src/utils/server.js';
import {
  createTestUser,
  getTestUser,
  removeTestUser,
} from '../src/utils/test.js';

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

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
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

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
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

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
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

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
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

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
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

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'test',
      password: 'wrongTest',
    });

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Username or password wrong');
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'wrongUsername',
      password: 'wrongTest',
    });

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
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

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
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

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
  });
});

describe('PATCH /api/users/current', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test-token')
      .send({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Admin');
    expect(result.body.data.email).toBe('admin@gmail.com');

    const user = await getTestUser();
    expect(await bcrypt.compare('admin123', user.password)).toBe(true);
  });

  it('should can update user name', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test-token')
      .send({
        name: 'Admin',
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Admin');
    expect(result.body.data.email).toBe('test@gmail.com');
  });

  it('should can update user email', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test-token')
      .send({
        email: 'admin@gmail.com',
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.email).toBe('admin@gmail.com');
  });

  it('should can update user password', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test-token')
      .send({
        password: 'admin123',
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');

    const user = await getTestUser();
    expect(await bcrypt.compare('admin123', user.password)).toBe(true);
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'wrong-token')
      .send({});

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
  });
});

describe('DELETE /api/users/logout', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    const result = await supertest(server)
      .delete('/api/users/logout')
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Logout Success');

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(server)
      .delete('/api/users/logout')
      .set('Authorization', 'wrong-token');

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
  });
});
