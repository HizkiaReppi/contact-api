import ResponseError from '../errors/ResponseError.js';

const validate = (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new ResponseError(400, error.message);
  } else {
    return value;
  }
};

export default validate;
