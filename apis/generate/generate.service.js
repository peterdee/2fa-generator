import { Authenticator } from '@otplib/core';
import { createDigest, createRandomBytes } from '@otplib/plugin-crypto';
import { keyDecoder, keyEncoder } from '@otplib/plugin-thirty-two';

import generateKeyURISchema from './generate-keyuri.schema.js';
import { KEY_URI_DEFAULTS } from '../../configuration/index.js';

export function getKeyURI({
  accountName = KEY_URI_DEFAULTS.accountName,
  algorithm = KEY_URI_DEFAULTS.algorithm,
  digits = KEY_URI_DEFAULTS.digits,
  issuer = KEY_URI_DEFAULTS.issuer,
  period = KEY_URI_DEFAULTS.period,
}) {
  const instance = new Authenticator({
    algorithm: algorithm.toLowerCase(),
    createDigest,
    createRandomBytes,
    digits,
    keyDecoder,
    keyEncoder,
    step: period,
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
