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

const get = async (req, res, next) => {
  try {
    const result = await contactService.get(req.user, req.params.contactId);
    res.status(200).json({
      status: true,
      code: 200,
      message: 'Get Data Contact Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
};
