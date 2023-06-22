import { prismaClient } from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';
import validate from '../validations/validation.js';
import { getContactValidation } from '../validations/contact-validation.js';
import { createAddressValidation } from '../validations/address-validation.js';

const create = async (user, contactId, payload) => {
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

export default {
  create,
};
