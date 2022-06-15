import joi from 'joi';

export default joi.object({
  algorithm: joi
    .string()
    .uppercase()
    .trim()
    .valid('SHA1', 'SHA256', 'SHA512')
    .required(),
  period: joi
    .number()
    .integer()
    .max(9999)
    .required(),
  secret: joi
    .string()
    .trim()
    .required(),
  token: joi
    .number()
    .integer()
    .max(999999)
    .required(),
});
