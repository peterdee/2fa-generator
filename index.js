import { authenticator } from 'otplib';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import generate from './apis/generate/index.js';
import logger from './logger.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(`${process.cwd()}/public`));

app.use('/api/generate', generate);

app.get(
  '/generate',
  (_, response) => {
    const secret = authenticator.generateSecret();
    const keyURI = authenticator.keyuri(
      'Test',
      '2FA-Generator',
      secret,
    );
    return response.status(200).send({
      data: {
        keyURI,
        timeRemaining: authenticator.timeRemaining(),
        tokenExample: authenticator.generate(secret),
      },
      info: 'OK',
      status: 200,
    });
  },
);

app.post(
  '/token',
  (request, response) => {
    const { body: { secret } = {} } = request;
    return response.status(200).send({
      data: {
        timeRemaining: authenticator.timeRemaining(),
        tokenExample: authenticator.generate(secret),
      },
      info: 'OK',
      status: 200,
    });
  },
);

app.post(
  '/validate',
  (request, response) => {
    const { body: { secret, token } = {} } = request;

    const isValid = authenticator.verify({ secret, token });
    if (!isValid) {
      return response.status(400).send({
        info: 'OTP_IS_INVALID',
        status: 400,
      });
    }

    return response.status(200).send({
      info: 'OK',
      status: 200,
    });
  },
);

const port = Number(process.env.PORT) || 9009;
app.listen(
  port,
  () => logger(`-- 2FA-GENERATOR is running on port ${port}`),
);
