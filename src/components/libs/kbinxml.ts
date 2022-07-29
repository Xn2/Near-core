import kbinxml from '@kamyu/kbinxml';
import * as fs from 'fs';

const fromKbinXML = (data: any) => {
  const parsed = kbinxml.decode(data);
  const buff = Buffer.from(parsed, 'base64');
  const decoded = buff.toString('ascii');
  return decoded;
};

const toKbinXML = (data: any) => {
  const buff = Buffer.from(data);
  const encoded = kbinxml.encode(buff);
  const buff2 = Buffer.from(encoded, 'base64');
  return buff2;
};

export { fromKbinXML, toKbinXML };
