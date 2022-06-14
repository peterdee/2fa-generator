import CustomError from '../../utilities/custom-error.js';
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUSES,
} from '../../configuration/index.js';
import response from '../../utilities/response.js';
import { getKeyURI, validateGenerateData } from './generate.service.js';

async function generateController(request, reply) {
  try {
    const { error: validationError, value } = validateGenerateData(request.body);
    if (validationError) {
      throw new CustomError({
        details: validationError.message,
        info: RESPONSE_MESSAGES.validationError,
      });
    }

    const keyURI = getKeyURI(value);

    console.log(keyURI);
    return response({
      data: {
        keyURI,
      },
      reply,
      request,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return response({
        details: error.details,
        info: error.info,
        reply,
        request,
        status: error.status,
      });
    }

    return response({
      error,
      info: RESPONSE_MESSAGES.internalServerError,
      reply,
      request,
      status: RESPONSE_STATUSES.internalServerError,
    });
  }
}

export default generateController;
