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

const list = async (req, res, next) => {
  try {
    const result = await addressService.list(req.user, req.params.contactId);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Get List Data Addresses Success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId, addressId } = req.params;
    const request = req.body;
    request.id = addressId;

    const result = await addressService.update(req.user, contactId, request);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Update Data Address Success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId, addressId } = req.params;

    await addressService.remove(req.user, contactId, addressId);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Remove Data Address Success',
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  list,
  update,
  remove,
};
