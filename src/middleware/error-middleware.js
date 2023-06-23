import ResponseError from '../errors/ResponseError.js';

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: false,
        code: err.status,
        errors: err.message,
      })
      .end();
  } else {
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
