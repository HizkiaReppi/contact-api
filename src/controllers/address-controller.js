import addressService from '../services/address-service.js';

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(
      req.user,
      req.params.contactId,
      req.body
    );

    res.status(201).json({
      status: true,
      code: 201,
      message: 'Get List Data Addresses Success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};
