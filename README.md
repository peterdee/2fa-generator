## 2FA Generator

[2FA Mobile](https://github.com/peterdee/2fa-mobile) testing utility

Stack: [Node](https://nodejs.org), [Express](http://expressjs.com), [OTPLib](https://www.npmjs.com/package/otplib), [QRCode](https://www.npmjs.com/package/qrcodejs), [jQuery](https://jquery.com)

DEV: http://localhost:9009

STAGE: https://generator-2fa.herokuapp.com

### Additional documentation

Key URI format: https://github.com/google/google-authenticator/wiki/Key-Uri-Format

TOTP specs: https://datatracker.ietf.org/doc/html/rfc6238#page-9

### Deploy

```shell script
git clone https://github.com/peterdee/2fa-generator
cd ./2fa-generator
nvm use 18
npm i
```

### Launch

```shell script
npm run dev
```

### Heroku

This application is manually deployed to [Heroku](https://www.heroku.com)

### License

[MIT](LICENSE.md)
