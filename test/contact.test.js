import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import { logger } from '../src/utils/logging.js';
import {
  createTestUser,
  removeAllTestContacts,
  removeTestUser,
} from '../src/utils/test.js';

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new contact', async () => {
    const result = await supertest(server)
      .post('/api/contacts')
      .set('Authorization', 'test-token')
      .send({
        first_name: 'test',
        last_name: 'test',
        email: 'test@gmail.com',
        phone: '082345678910',
      });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Create Data Contact Success');
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('test');
    expect(result.body.data.last_name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.phone).toBe('082345678910');
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(server)
      .post('/api/contacts')
      .set('Authorization', 'test-token')
      .send({
        first_name: '',
        last_name: 'test',
        email: 'test',
        phone: '0823456789101234567890',
      });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
