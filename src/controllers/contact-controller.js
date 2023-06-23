import contactService from '../services/contact-service.js';
import { logger } from '../utils/logging.js';

const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user, req.body);

    logger.info('Create Data Contact Success');

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

    logger.info('Get Data Contact Success');

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

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const request = req.body;
    request.id = contactId;

    const result = await contactService.update(req.user, request);

    logger.info('Update Data Contact Success');

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Update Data Contact Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { user } = req;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    };

    const { data, meta } = await contactService.search(user, request);

    logger.info('Search Data Contacts Success');

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Search Data Contacts Success',
      data,
      meta,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.user, req.params.contactId);

    logger.info('Remove Data Contact Success');

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Remove Data Contact Success',
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  search,
  remove,
};
