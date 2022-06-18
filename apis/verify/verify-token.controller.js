import CustomError from '../../utilities/custom-error.js';
import {
  KEY_URI_DEFAULTS,
  RESPONSE_MESSAGES,
} from '../../configuration/index.js';
import response from '../../utilities/response.js';
import {
  validateVerifyData,
  verifyClientToken,
} from './verify.service.js';

export default function verifyTokenController(request, reply) {
  const { error: validationError, value } = validateVerifyData(request.body);
  if (validationError) {
    throw new CustomError({
      details: validationError.message,
      info: RESPONSE_MESSAGES.validationError,
    });
  }

  const { isValid, timeRemaining = null } = verifyClientToken({
    algorithm: value.algorithm || KEY_URI_DEFAULTS.algorithm,
    period: value.period,
    secret: value.secret,
    token: value.token,
  });

  if (!isValid) {
    throw new CustomError({ info: RESPONSE_MESSAGES.invalidToken });
  }

  return response({
    data: {
      isValid,
      timeRemaining,
    },
    reply,
    request,
  });
}
