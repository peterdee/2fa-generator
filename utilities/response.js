import logger from './logger.js';
import { RESPONSE_MESSAGES, RESPONSE_STATUSES } from '../configuration/index.js';

export default function response({
  data = null,
  details = '',
  error = null,
  info = RESPONSE_MESSAGES.ok,
  reply,
  request,
  status = RESPONSE_STATUSES.ok,
}) {
  if (error && status === RESPONSE_STATUSES.internalServerError) {
    logger('Internal server error:\n', error);
  }

  const now = Date.now();
  const responseObject = {
    datetime: now,
    info,
    request: `${request.originalUrl} [${request.method}]`,
    status,
  };

  if (data) {
    responseObject.data = data;
  }
  if (details) {
    responseObject.details = details;
  }

  return reply.status(status).send(responseObject);
}
