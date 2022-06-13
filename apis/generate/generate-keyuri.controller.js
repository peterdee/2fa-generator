import validateGenerateData from './generate.service.js';

async function generateController(request, response) {
  validateGenerateData(request.body);
  return response.status(200).send({ info: 'OK' });
}

export default generateController;
