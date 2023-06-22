import supertest from 'supertest';
import { server } from '../src/utils/server.js';
import {
  createTestContact,
  createTestUser,
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
    expect(result.body.status).toBe('false');
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
    expect(result.body.status).toBe('false');
    expect(result.body.code).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
  });
});
