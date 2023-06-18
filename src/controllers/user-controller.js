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

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      status: 'true',
      code: 200,
      message: 'Login Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { username } = req.user;
    const result = await userService.get(username);

    res.status(200).json({
      status: 'true',
      code: 200,
      message: 'Get Data Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { username } = req.user;
    const request = req.body;
    request.username = username;

    const result = await userService.update(request);

    res.status(200).json({
      status: 'true',
      code: 200,
      message: 'Update Data Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);

    res.status(200).json({
      status: 'true',
      code: 200,
      message: 'Logout Success',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
