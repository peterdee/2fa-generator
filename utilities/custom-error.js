import { RESPONSE_STATUSES } from '../configuration/index.js';

class CustomError extends Error {
  constructor({
    details = '',
    info,
    status = RESPONSE_STATUSES.badRequest,
  }) {
    if (!info) {
      throw new Error('Error info is required!');
    }

    super(info);

    this.info = info;
    this.status = status;

    if (details) {
      this.details = details;
    }
  }
}

export default CustomError;
