export const KEY_URI_DEFAULTS = {
  accountName: 'user@localhost',
  algorithm: 'SHA1',
  digits: 6,
  issuer: '2FA Generator',
  period: 30,
};

export const PORT = Number(process.env.PORT) || 9009;

export const RESPONSE_MESSAGES = {
  validationError: 'VALIDATION_ERROR',
};

export const RESPONSE_STATUSES = {
  badRequest: 400,
  ok: 200,
};
