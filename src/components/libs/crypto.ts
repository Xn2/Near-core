import { NextFunction, Request, Response } from 'express';
import { fromKbinXML, toKbinXML } from '../libs/kbinxml';
import { LZ77Compress, LZ77Decompress } from '../libs/lz77';
import convert from 'xml-js';
import config from '../../config.json';

import md5 from 'md5';
//@ts-ignore
import rc4 from 'arc4';

const secretKey = config.eamuse_secretKey;

const decryptHTTP = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['user-agent'] !== 'EAMUSE.XRPC/1.0') {
    next();
    return;
  }
  let data = req.body;
  if (req.headers['x-eamuse-info']) {
    const arc4key = headerToKey(req.headers['x-eamuse-info'] as string);
    const cipher = rc4('arc4', arc4key);
    data = cipher.decodeBuffer(data);
  }
  if (req.headers['x-compress'] !== 'none') {
    data = Buffer.from(LZ77Decompress(data));
  }
  const parsed = fromKbinXML(data);
  //@ts-ignore
  req.contents = convert.xml2js(parsed, { compact: true, spaces: 4 }).call;
  next();
};

const encryptHTTP = (data: any, log = false, compress: any, encrypt: any) => {
  data = convert.json2xml(data);
  let key = null;
  if (log) console.log(data);
  data = Buffer.from(toKbinXML(data));
  if (compress) {
    data = Buffer.from(LZ77Compress(data));
  }
  if (encrypt) {
    key = keyGen();
    const arc4key = headerToKey(key);
    const cipher = rc4('arc4', arc4key);
    data = cipher.encodeBuffer(data);
  }
  return { key, body: data };
};

const keyGen = () => {
  const alpha = '0123456789abcdef';
  let key = '1-';
  for (let i = 0; i < 13; i++) {
    if (i == 8) {
      key += '-';
    } else {
      key += alpha[Math.floor(Math.random() * alpha.length)];
    }
  }
  return key;
};

// Convert a hex string to a byte array
const hexToBytes = (hex: string) => {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

const headerToKey = (eamuseHeader: string) => {
  const headerKey = eamuseHeader.split('-');
  const fullKey = headerKey[1] + headerKey[2] + secretKey;
  const rawKey = hexToBytes(fullKey);
  return Buffer.from(md5(rawKey), 'hex');
};

export { decryptHTTP, encryptHTTP };
