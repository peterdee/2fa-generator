import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import limiter from 'express-rate-limit';
import pino from 'express-pino-logger';
import pretty from 'pino-pretty';

import CustomError from './utilities/custom-error.js';
import generate from './apis/generate/index.js';
import logger from './utilities/logger.js';
import {
  PORT,
  RESPONSE_MESSAGES,
  RESPONSE_STATUSES,
} from './configuration/index.js';
import response from './utilities/response.js';
import verify from './apis/verify/index.js';

const app = express();
const pinoLogger = pino(pretty());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression({ level: 6 }));
app.use(cors());
app.use(express.static(`${process.cwd()}/public`));
app.use(helmet());
app.use(limiter({
  max: 20,
  windowMs: 60000,
}));
app.use(pinoLogger);

app.use('/api/generate', generate);
app.use('/api/verify', verify);

// eslint-disable-next-line
app.use((error, request, reply, _) => {
  if (error instanceof CustomError) {
    return response({
      details: error.details,
      info: error.info,
      reply,
      request,
      status: error.status,
    });
  }

  return response({
    error,
    info: RESPONSE_MESSAGES.internalServerError,
    reply,
    request,
    status: RESPONSE_STATUSES.internalServerError,
  });
});

app.listen(
  PORT,
  () => logger(`-- 2FA-GENERATOR is running on port ${PORT}`),
);
