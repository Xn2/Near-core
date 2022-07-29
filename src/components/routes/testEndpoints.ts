import { Router } from 'express';
import { decryptHTTP, encryptHTTP } from '../libs/crypto';

const router = Router();

router.post('/testBinARC4LZDec', decryptHTTP, (req, res) => {
  //@ts-ignore
  res.send(req.contents);
});

router.post('/testBinARC4LZEnc', (req, res) => {
  //@ts-ignore
  // Need rework
  const encrypt = encryptHTTP(req.rawBody);
  res.set('x-eamuse-info', encrypt.key as string);
  res.send(encrypt.body);
});

export default router;
