import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
} from '../src/utils/test.js';

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new address', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set('Authorization', 'test-token')
      .send({
        street: 'street test',
        city: 'city test',
        province: 'province test',
        country: 'indonesia',
        postal_code: '234234',
      });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(201);
    expect(result.body.message).toBe('Create Data Address Success');
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('street test');
    expect(result.body.data.city).toBe('city test');
    expect(result.body.data.province).toBe('province test');
    expect(result.body.data.country).toBe('indonesia');
    expect(result.body.data.postal_code).toBe('234234');
  });

  it('should reject if address request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set('Authorization', 'test-token')
      .send({
        street: 'jalan test',
        city: 'kota test',
        province: 'provinsi test',
        country: '',
        postal_code: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .post(`/api/contacts/${testContact.id}-wrong/addresses`)
      .set('Authorization', 'test-token')
      .send({
        street: 'jalan test',
        city: 'kota test',
        province: 'provinsi test',
        country: '',
        postal_code: '',
      });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Get Data Address Success');
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('street test');
    expect(result.body.data.city).toBe('city test');
    expect(result.body.data.province).toBe('province test');
    expect(result.body.data.country).toBe('indonesia');
    expect(result.body.data.postal_code).toBe('234234');
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}-wrong/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}-wrong`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Address is not found');
  });
});

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can list addresses', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}/addresses`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Get List Data Addresses Success');
    expect(result.body.data.length).toBe(1);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}-wrong/addresses`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update address', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token')
      .send({
        street: 'street test update',
        city: 'city test update',
        province: 'province test update',
        country: 'indonesia',
        postal_code: '234234234',
      });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Update Data Address Success');
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe('street test update');
    expect(result.body.data.city).toBe('city test update');
    expect(result.body.data.province).toBe('province test update');
    expect(result.body.data.country).toBe('indonesia');
    expect(result.body.data.postal_code).toBe('234234234');
  });

  it('should reject if request is not valid', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token')
      .send({
        street: 'street test update',
        city: 'city test update',
        province: 'province test update',
        country: '',
        postal_code: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}-wrong`)
      .set('Authorization', 'test-token')
      .send({
        street: 'street test update',
        city: 'city test update',
        province: 'province test update',
        country: 'indonesia',
        postal_code: '2312323',
      });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Address is not found');
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .put(`/api/contacts/${testContact.id}-wrong/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token')
      .send({
        street: 'street test update',
        city: 'city test update',
        province: 'province test update',
        country: 'indonesia',
        postal_code: '2312323',
      });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can remove address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(server)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set('Authorization', 'test-token');

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('Remove Data Address Success');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .delete(
        `/api/contacts/${testContact.id}/addresses/${testAddress.id}-wrong`
      )
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Address is not found');
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(server)
      .delete(
        `/api/contacts/${testContact.id}-wrong/addresses/${testAddress.id}`
      )
      .set('Authorization', 'test-token');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});
