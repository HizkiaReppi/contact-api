import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import { logger } from '../src/utils/logging.js';
import {
  createManyTestContacts,
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

describe('GET /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can search without parameter', async () => {
    const result = await supertest(server)
      .get('/api/contacts')
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Search Data Contacts Success');
    expect(result.body.data.length).toBe(10);
    expect(result.body.meta.page).toBe(1);
    expect(result.body.meta.total_page).toBe(2);
    expect(result.body.meta.total_data).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(server)
      .get('/api/contacts')
      .query({
        page: 2,
      })
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Search Data Contacts Success');
    expect(result.body.data.length).toBe(5);
    expect(result.body.meta.page).toBe(2);
    expect(result.body.meta.total_page).toBe(2);
    expect(result.body.meta.total_data).toBe(15);
  });

  it('should can search using name', async () => {
    const result = await supertest(server)
      .get('/api/contacts')
      .query({
        name: 'test 1',
      })
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Search Data Contacts Success');
    expect(result.body.data.length).toBe(6);
    expect(result.body.meta.page).toBe(1);
    expect(result.body.meta.total_page).toBe(1);
    expect(result.body.meta.total_data).toBe(6);
  });

  it('should can search using email', async () => {
    const result = await supertest(server)
      .get('/api/contacts')
      .query({
        email: 'test1',
      })
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Search Data Contacts Success');
    expect(result.body.data.length).toBe(6);
    expect(result.body.meta.page).toBe(1);
    expect(result.body.meta.total_page).toBe(1);
    expect(result.body.meta.total_data).toBe(6);
  });

  it('should can search using phone', async () => {
    const result = await supertest(server)
      .get('/api/contacts')
      .query({
        phone: '08234567891',
      })
      .set('Authorization', 'test-token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Search Data Contacts Success');
    expect(result.body.data.length).toBe(6);
    expect(result.body.meta.page).toBe(1);
    expect(result.body.meta.total_page).toBe(1);
    expect(result.body.meta.total_data).toBe(6);
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete contact', async () => {
    let testContact = await getTestContact();
    const result = await supertest(server)
      .delete(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Remove Data Contact Success');

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(server)
      .delete(`/api/contacts/${testContact.id}-wrong`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});
