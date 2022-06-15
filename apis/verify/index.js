import { Router } from 'express';

import verifyTokenController from './verify-token.controller.js';

const router = new Router();

router.post('/', verifyTokenController);

export default router;
