import userService from '../services/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(201).json({
      status: 'true',
      code: 201,
      message: 'Register Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
