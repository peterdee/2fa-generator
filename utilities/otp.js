import { Authenticator } from '@otplib/core';
import { createDigest, createRandomBytes } from '@otplib/plugin-crypto';
import { keyDecoder, keyEncoder } from '@otplib/plugin-thirty-two';

import { KEY_URI_DEFAULTS } from '../configuration/index.js';

export function createAuthenticator({
  algorithm = KEY_URI_DEFAULTS.algorithm,
  digits = KEY_URI_DEFAULTS.digits,
  period = KEY_URI_DEFAULTS.period,
}) {
  return new Authenticator({
    algorithm: algorithm.toLowerCase(),
    createDigest,
    createRandomBytes,
    digits,
    keyDecoder,
    keyEncoder,
    step: period,
  });
}

export function verifyToken({
  algorithm = KEY_URI_DEFAULTS.algorithm,
  period = KEY_URI_DEFAULTS.period,
  secret,
  token,
}) {
  const instance = createAuthenticator({
    algorithm,
    digits: String(token).length,
    period,
  });

  const isValid = instance.verify({ secret, token });
  return {
    isValid,
    timeRemaining: isValid ? instance.timeRemaining() : null,
  };
}
