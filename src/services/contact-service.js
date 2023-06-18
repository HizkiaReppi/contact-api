import validate from '../validations/validation.js';
import { createContactValidation } from '../validations/contact-validation.js';
import { prismaClient } from '../utils/database.js';

const create = async (user, payload) => {
  const contact = validate(createContactValidation, payload);
  contact.userId = user.id;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export default {
  create,
};
