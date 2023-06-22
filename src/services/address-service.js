import { prismaClient } from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';
import validate from '../validations/validation.js';
import { getContactValidation } from '../validations/contact-validation.js';
import {
  createAddressValidation,
  getAddressValidation,
} from '../validations/address-validation.js';

const checkContactMustExists = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      userId: user.id,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'Contact is not found');
  }

  return contactId;
};

const create = async (user, contactId, payload) => {
  contactId = await checkContactMustExists(user, contactId);

  const address = validate(createAddressValidation, payload);
  address.contactId = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, 'Address is not found');
  }

  return address;
};

export default {
  create,
  get,
};