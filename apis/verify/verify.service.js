import validateVerifyTokenSchema from './verify-token.schema.js';
import { verifyToken } from '../../utilities/otp.js';

export function verifyClientToken({
  algorithm,
  period,
  secret,
  token,
}) {
  return verifyToken({
    algorithm,
    period,
    secret,
    token,
  });
}

export function validateVerifyData(body) {
  return validateVerifyTokenSchema.validate(body);
}
