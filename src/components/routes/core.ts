import { Router } from 'express';
import { decryptHTTP, encryptHTTP } from '../libs/crypto';
import objectFactory from '../libs/objectFactory';
import sv6 from '../games/sv6';
import config from '../../config.json';

const router = Router();

router.use(decryptHTTP);

router.post('/', async (req, res) => {
  console.log(req.headers['user-agent']);
  if (req.headers['user-agent'] !== 'EAMUSE.XRPC/1.0') {
    res.redirect('/web/login.html');
    return;
  }
  if (
    //@ts-ignore
    req.query.model.substring(0, 3) !== 'KFC' &&
    req.query.f !== 'services.get'
  ) {
    res.sendStatus(400);
    return;
  }
  const initResponse = objectFactory.getInitResponseObject();
  //@ts-ignore
  // Need rework
  const ciphered = encryptHTTP(initResponse);
  // Need rework
  res.set('X-Eamuse-Info', ciphered.key as string);
  res.set('X-Compress', 'none');
  res.send(ciphered.body);
});

router.post('/core', async (req, res) => {
  let initResponse;
  let log = false;
  let compress = false;
  let encrypt = true;
  //@ts-ignore
  // Need rework
  if (req.query.model.substring(0, 3) !== 'KFC') {
    res.sendStatus(400);
    return;
  }
  switch (req.query.f) {
    case 'services.get':
      initResponse = objectFactory.getInitResponseObject();
      break;
    case 'pcbtracker.alive':
      initResponse = objectFactory.getKeepAliveResponseObject();
      break;
    case 'package.list':
      initResponse = objectFactory.getPackageListObject();
      break;
    case 'message.get':
      initResponse = objectFactory.getMessageObject();
      break;
    case 'facility.get':
      let ip = (req.headers['x-forwarded-for'] || req.ip) as string;
      if (ip.indexOf(':') !== -1) ip = ip.split(':')[ip.split(':').length - 1];
      console.log(ip);
      initResponse = await objectFactory.getFacilityObject(ip);
      break;
    case 'pcbevent.put':
      initResponse = objectFactory.getPcbEventObject();
      break;
    case 'eventlog.write':
      initResponse = objectFactory.getEventLogObject();
      break;
    case 'game.sv6_common':
      initResponse = sv6.getSV6CommonData();
      compress = true;
      break;
    case 'game.sv6_shop':
      initResponse = sv6.getSV6ShopData();
      break;
    case 'game.sv6_hiscore':
      initResponse = await sv6.getSV6HiScoreData();
      compress = true;
      break;
    case 'cardmng.inquire':
      initResponse = await sv6.getSV6InquireData(
        //@ts-ignore
        req.contents.cardmng._attributes.cardid
      );
      break;
    case 'cardmng.authpass':
      initResponse = await sv6.getSV6AuthpassData(
        //@ts-ignore
        req.contents.cardmng._attributes.refid,
        //@ts-ignore
        req.contents.cardmng._attributes.pass,
        //@ts-ignore
        req.contents._attributes.tag
      );
      break;
    case 'cardmng.getrefid':
      //@ts-ignore
      if (typeof req.contents.cardmng._attributes.cardid !== 'undefined') {
        initResponse = await sv6.createSV6PlayerAccount(
          //@ts-ignore
          req.contents.cardmng._attributes.cardid,
          //@ts-ignore
          req.contents.cardmng._attributes.passwd
        );
      } else {
        initResponse = await sv6.createSV6PlayerAccount(
          //@ts-ignore
          req.contents.cardmng._attributes.refid,
          //@ts-ignore
          req.contents.cardmng._attributes.passwd
        );
      }
      break;
    case 'eacoin.checkin':
      encrypt = false;
      initResponse = await sv6.getSV6PaseliCheckinData(
        //@ts-ignore
        req.contents.eacoin.cardid._text,
        //@ts-ignore
        req.contents.eacoin.passwd._text
      );
      break;
    case 'eacoin.consume':
      encrypt = false;
      initResponse = sv6.getSV6PaseliConsumeData();
      break;
    case 'eacoin.checkout':
      encrypt = false;
      initResponse = sv6.getSV6PaseliCheckoutData();
      break;
    case 'game.sv6_new':
      initResponse = await sv6.completeSV6PlayerAccount(
        //@ts-ignore
        req.contents.game.refid._text,
        //@ts-ignore
        req.contents.game.name._text,
        //@ts-ignore
        req.contents._attributes.tag
      );
      break;
    case 'game.sv6_load':
      initResponse = await sv6.loadSV6PlayerAccount(
        //@ts-ignore
        req.contents.game.refid._text,
        //@ts-ignore
        req.contents._attributes.tag
      );
      break;
    case 'game.sv6_load_m':
      //@ts-ignore
      initResponse = await sv6.getSV6LoadMData(req.contents.game.refid._text);
      break;
    case 'game.sv6_frozen':
      initResponse = await sv6.getSV6FrozenData();
      break;
    case 'game.sv6_load_r':
      //@ts-ignore
      initResponse = await sv6.getSV6RivalData(req.contents.game.refid._text);
      break;
    case 'game.sv6_save_m':
      initResponse = await sv6.saveSV6Score(
        //@ts-ignore
        req.contents._attributes.tag,
        //@ts-ignore
        req.contents.game
      );
      break;
    case 'game.sv6_save_e':
      initResponse = await sv6.getSV6SaveEData();
      break;
    case 'game.sv6_save_c':
      initResponse = await sv6.SaveSV6SkillData(
        //@ts-ignore
        req.contents._attributes.tag,
        //@ts-ignore
        req.contents.game
      );
      break;
    case 'game.sv6_play_s':
      initResponse = await sv6.getSV6PlaySData();
      break;
    case 'game.sv6_lounge':
      initResponse = await sv6.getSV6LoungeData();
      break;
    case 'game.sv6_save':
      initResponse = await sv6.saveSV6(
        //@ts-ignore
        req.contents._attributes.tag,
        //@ts-ignore
        req.contents.game.refid._text,
        //@ts-ignore
        req.contents.game
      );
      break;
    case 'game.sv6_entry_s':
      initResponse = await sv6.getSV6EntrySData(
        //@ts-ignore
        req.contents._attributes.tag,
        //@ts-ignore
        req.contents.game
      );
      break;
    default:
      res.sendStatus(400);
      return;
  }
  if (!initResponse) {
    res.sendStatus(403);
    return;
  }
  const ciphered = encryptHTTP(initResponse, log, compress, encrypt);
  if (ciphered.key !== null) res.set('X-Eamuse-Info', ciphered.key);
  res.set('X-Compress', 'none');
  if (compress) res.set('X-Compress', 'lz77');
  res.send(ciphered.body);
});

router.post('/core/KFC*/services/get', (req, res) => {
  const initResponse = objectFactory.getInitResponseObject();
  //@ts-ignore
  // Need rework
  const ciphered = encryptHTTP(initResponse);
  res.set('X-Eamuse-Info', ciphered.key as string);
  res.set('X-Compress', 'none');
  res.send(ciphered.body);
});

router.post('//KFC*/services/get', (req, res) => {
  const initResponse = objectFactory.getInitResponseObject();
  //@ts-ignore
  // Need rework
  const ciphered = encryptHTTP(initResponse);
  res.set('X-Eamuse-Info', ciphered.key as string);
  res.set('X-Compress', 'none');
  res.send(ciphered.body);
});

export default router;
