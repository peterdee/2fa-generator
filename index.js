import { authenticator } from 'otplib';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(`${process.cwd()}/public`));

app.get(
  '/generate',
  (_, response) => {
    const content = authenticator.keyuri(
      'Test',
      '2FA-Generator',
      authenticator.generateSecret(),
    );
    return response.status(200).send({
      content,
    });
  },
);

app.post(
  '/validate',
  (request, response) => {
    const { body: { token = '', value = null } = {} } = request;

    const isValid = authenticator.verify({ token, secret: Number(value) });
    if (!isValid) {
      return response.status(400).send({
        error: 'OTP is invalid',
      });
    }

    return response.status(200);
  },
);

app.listen(9009);
