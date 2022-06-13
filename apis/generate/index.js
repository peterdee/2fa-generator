import { Router } from 'express';

import generateKeyURIController from './generate-keyuri.controller.js';

const router = new Router();

router.post('/', generateKeyURIController);

export default router;
