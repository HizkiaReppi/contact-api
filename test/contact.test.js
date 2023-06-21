import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import { logger } from '../src/utils/logging.js';
import {
  createTestContact,
  createTestUser,
  getTestContact,
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

describe('GET /api/contact/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Get Data Contact Success');
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('should return 404 if contact id is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}-wrong`)
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});

describe('PUT /api/contact/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update contact', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'test-token')
      .send({
        first_name: 'test-update',
        last_name: 'test-update',
        email: 'testupdate@gmail.com',
        phone: '0823456789',
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Contact Success');
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe('test-update');
    expect(result.body.data.last_name).toBe('test-update');
    expect(result.body.data.email).toBe('testupdate@gmail.com');
    expect(result.body.data.phone).toBe('0823456789');
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'test-token')
      .send({
        first_name: '',
        last_name: '',
        email: 'testupdate',
        phone: '',
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if contact id is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}-wrong`)
      .set('Authorization', 'test-token')
      .send({
        first_name: 'test-update',
        last_name: 'test-update',
        email: 'testupdate@gmail.com',
        phone: '0823456789',
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});
