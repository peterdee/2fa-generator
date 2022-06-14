import joi from 'joi';

export default joi.object({
  accountName: joi
    .string()
    .trim()
    .max(64)
    .allow(null, ''),
  algorithm: joi
    .string()
    .uppercase()
    .trim()
    .valid('SHA1', 'SHA256', 'SHA512')
    .allow(null, ''),
  digits: joi
    .number()
    .integer()
    .valid(6, 8)
    .allow(null, ''),
  issuer: joi
    .string()
    .max(64)
    .allow(null, ''),
  period: joi
    .number()
    .integer()
    .max(9999)
    .allow(null, ''),
});
