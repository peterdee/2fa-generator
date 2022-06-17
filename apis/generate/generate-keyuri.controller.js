import CustomError from '../../utilities/custom-error.js';
import { getKeyURI, validateGenerateData } from './generate.service.js';
import response from '../../utilities/response.js';
import { RESPONSE_MESSAGES } from '../../configuration/index.js';

function generateController(request, reply) {
  const { error: validationError, value } = validateGenerateData(request.body);
  if (validationError) {
    throw new CustomError({
      details: validationError.message,
      info: RESPONSE_MESSAGES.validationError,
    });
  }

  const result = getKeyURI(value);

  return response({
    data: {
      ...result,
    },
    reply,
    request,
  });
}

export default generateController;
