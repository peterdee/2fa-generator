import generateKeyURISchema from './generate-keyuri.schema.js';

export default function validateGenerateData(body) {
  const result = generateKeyURISchema.validate(body);
  console.log(result);
}
