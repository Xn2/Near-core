import { Router } from 'express';
import apiRouter from './routes/api';
import coreRouter from './routes/core';
import frontRouter from './routes/front';
import testRouter from './routes/testEndpoints';

const router = Router();

router.use(apiRouter);
router.use(coreRouter);
router.use(frontRouter);
router.use(testRouter);

export default router;
