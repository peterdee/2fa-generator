import { Authenticator } from 'otplib/core';

import generateKeyURISchema from './generate-keyuri.schema.js';
import { KEY_URI_DEFAULTS } from '../../configuration/index.js';

export function getKeyURI({
  accountName = KEY_URI_DEFAULTS.accountName,
  algorithm = KEY_URI_DEFAULTS.algorithm,
  digits = KEY_URI_DEFAULTS.digits,
  issuer = KEY_URI_DEFAULTS.issuer,
  period = KEY_URI_DEFAULTS.period,
}) {
  console.log('here');
  const instance = new Authenticator();
  console.log('here');
  instance.options = {
    algorithm,
    digits,
    step: period,
  };
  console.log(instance);
  const secret = instance.generateSecret();
  const keyURI = instance.keyuri(
    accountName,
    issuer,
    secret,
  );

  return keyURI;
}

export function validateGenerateData(body) {
  return generateKeyURISchema.validate(body);
}
