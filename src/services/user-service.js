import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from '../validations/user-validation.js';
import validate from '../validations/validation.js';
import ResponseError from '../errors/ResponseError.js';
import { prismaClient } from '../utils/database.js';

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

const login = async (payload) => {
  const loginRequest = validate(loginUserValidation, payload);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token,
    },
    select: {
      token: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User is not found');
  }

  return user;
};

export default {
  register,
  login,
  get,
};
