import validate from '../validations/validation.js';
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from '../validations/contact-validation.js';
import { prismaClient } from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';

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

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      userId: user.id,
      id: contactId,
    },
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

  if (!contact) {
    throw new ResponseError(404, 'Contact is not found');
  }

  return contact;
};

const update = async (user, payload) => {
  const contact = validate(updateContactValidation, payload);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      userId: user.id,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'Contact is not found');
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      updatedAt: true,
    },
  });
};

const search = async (user, payload) => {
  payload = validate(searchContactValidation, payload);

  const skip = (payload.page - 1) * payload.size;
  const filters = [];

  filters.push({
    userId: user.id,
  });

  if (payload.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: payload.name,
          },
        },
        {
          last_name: {
            contains: payload.name,
          },
        },
      ],
    });
  }
  if (payload.email) {
    filters.push({
      email: {
        contains: payload.email,
      },
    });
  }
  if (payload.phone) {
    filters.push({
      phone: {
        contains: payload.phone,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: payload.size,
    skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    meta: {
      page: payload.page,
      total_page: Math.ceil(totalItems / payload.size),
      total_data: totalItems,
    },
  };
};

export default {
  create,
  get,
  update,
  search,
};
