import Joi from 'joi';

export const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
});

export const getContactValidation = Joi.string().required();
