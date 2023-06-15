import bcrypt from 'bcrypt';
import { registerUserValidation } from '../validations/user-validation.js';
import validate from '../validations/validation.js';
import { prismaClient } from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';

const register = async (payload) => {
  const user = validate(registerUserValidation, payload);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'Username already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export default {
  register,
};
