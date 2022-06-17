import { createAuthenticator } from '../../utilities/otp.js';
import generateKeyURISchema from './generate-keyuri.schema.js';
import { KEY_URI_DEFAULTS } from '../../configuration/index.js';

export function getKeyURI({
  accountName = KEY_URI_DEFAULTS.accountName,
  algorithm = KEY_URI_DEFAULTS.algorithm,
  digits = KEY_URI_DEFAULTS.digits,
  issuer = KEY_URI_DEFAULTS.issuer,
  period = KEY_URI_DEFAULTS.period,
}) {
  const instance = createAuthenticator({
    algorithm,
    digits,
    period,
  });

  const secret = instance.generateSecret();
  const keyURI = instance.keyuri(
    accountName,
    issuer,
    secret,
  );

  return {
    keyURI,
    options: {
      accountName,
      algorithm,
      digits,
      issuer,
      period,
    },
    secret,
    timeRemaining: instance.timeRemaining(),
    tokenExample: instance.generate(secret),
  };
}

export function validateGenerateData(body) {
  return generateKeyURISchema.validate(body);
}
