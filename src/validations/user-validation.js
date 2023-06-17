import Joi from 'joi';

export const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
});

export const getUserValidation = Joi.string().max(100).required();
