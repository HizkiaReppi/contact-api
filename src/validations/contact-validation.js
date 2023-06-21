/* eslint-disable  */
import Joi from 'joi';

export const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
});

export const getContactValidation = Joi.string().required();

export const updateContactValidation = Joi.object({
  id: Joi.string().required(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
});

export const searchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});
