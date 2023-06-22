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
      message: 'Create Data Address Success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const { contactId, addressId } = req.params;

    const result = await addressService.get(req.user, contactId, addressId);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Get Data Address Success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
};
