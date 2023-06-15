import ResponseError from '../errors/ResponseError.js';

const validate = (schema, payload) => {
  const result = schema.validate(payload, {
    abortEarly: false,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export default validate;
