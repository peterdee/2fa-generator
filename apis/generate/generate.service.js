import generateKeyURISchema from './generate-keyuri.schema.js';

export default function validateGenerateData(body) {
  return generateKeyURISchema.validate(body);
}
