import ResponseError from '../errors/ResponseError.js';
import { logger } from '../utils/logging.js';

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    logger.error(err.message);
    res
      .status(err.status)
      .json({
        status: false,
        code: err.status,
        errors: err.message,
      })
      .end();
  } else {
    logger.error(err.message);
    res
      .status(500)
      .json({
        status: false,
        code: 500,
        errors: err.message,
      })
      .end();
  }
};

export default errorMiddleware;
