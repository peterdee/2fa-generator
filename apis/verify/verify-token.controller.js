import response from '../../utilities/response.js';

export default function verifyToken(request, reply) {
  return response({ reply, request });
}
