import express, { Router } from 'express';

const router = Router();

router.use('/web', express.static(__dirname + '../../components/front/public'));

export default router;
