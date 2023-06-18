import contactService from '../services/contact-service.js';

const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user, req.body);
    res.status(201).json({
      status: true,
      code: 201,
      message: 'Create Data Contact Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
