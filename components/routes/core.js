const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')
const objectFactory = require('../libs/objectFactory.js')
const sv6 = require('../games/sv6.js')
const config = require("../../config.json")

router.use(decryptHTTP)

router.post('/', async (req, res) => {
    console.log(req.headers['user-agent'])
    if (req.headers['user-agent'] !== "EAMUSE.XRPC/1.0"){
        res.redirect("/web/login.html"); return;
    }
    if (req.query.model.substring(0,3) !== "KFC" && req.query.f !== "services.get"){
        res.sendStatus(400); return
    } 
    const initResponse = objectFactory.getInitResponseObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post('/core', async (req, res) => {
    let initResponse;
    let log = false
    let compress = false
    let encrypt = true
    if (req.query.model.substring(0,3) !== "KFC"){
        res.sendStatus(400); return
    }
    switch(req.query.f){
        case "services.get" :
            initResponse = objectFactory.getInitResponseObject();
            break;
        case "pcbtracker.alive":
            initResponse = objectFactory.getKeepAliveResponseObject();
            break;
        case "package.list":
            initResponse = objectFactory.getPackageListObject();
            break;
        case "message.get":
            initResponse = objectFactory.getMessageObject();
            break;
        case "facility.get":
            let ip = req.headers['x-forwarded-for'] || req.ip
            if (ip.indexOf(':') !== -1) ip = ip.split(':')[ip.split(':').length - 1]
            console.log(ip)
            initResponse = await objectFactory.getFacilityObject(ip);
            break;
        case "pcbevent.put":
            initResponse =  objectFactory.getPcbEventObject();
            break;
        case "eventlog.write":
            initResponse = objectFactory.getEventLogObject();
            break;
        case "game.sv6_common":
            initResponse = sv6.getSV6CommonData();
            compress = true
            break;
        case "game.sv6_shop":
            initResponse = sv6.getSV6ShopData();
            break;
        case "game.sv6_hiscore":
            initResponse = await sv6.getSV6HiScoreData();
            compress = true
            break;
        case "game.sv6_exception":
            initResponse = sv6.getSV6ExceptionData();
            break;
        case "cardmng.inquire":
            initResponse = await sv6.getSV6InquireData(req.contents.cardmng._attributes.cardid);
            break;
        case "cardmng.authpass":
            initResponse = await sv6.getSV6AuthpassData(req.contents.cardmng._attributes.refid, req.contents.cardmng._attributes.pass, req.contents._attributes.tag);
            break; 
        case "cardmng.getrefid":
            if (typeof req.contents.cardmng._attributes.cardid !== "undefined"){
                initResponse = await sv6.createSV6PlayerAccount(req.contents.cardmng._attributes.cardid, req.contents.cardmng._attributes.passwd);
            }
            else{
                initResponse = await sv6.createSV6PlayerAccount(req.contents.cardmng._attributes.refid, req.contents.cardmng._attributes.passwd);
            }
            break;
        case "eacoin.checkin":
            encrypt = false
            initResponse = await sv6.getSV6PaseliCheckinData(req.contents.eacoin.cardid._text, req.contents.eacoin.passwd._text);
            break;
        case "eacoin.consume":
            encrypt = false
            initResponse = sv6.getSV6PaseliConsumeData();
            break;
        case "eacoin.checkout":
            encrypt = false
            initResponse = sv6.getSV6PaseliCheckoutData();
            break;     
        case "game.sv6_new":
            initResponse = await sv6.completeSV6PlayerAccount(req.contents.game.refid._text, req.contents.game.name._text, req.contents._attributes.tag);
            break;
        case "game.sv6_load":
            initResponse = await sv6.loadSV6PlayerAccount(req.contents.game.refid._text, req.contents._attributes.tag);
            break;
        case "game.sv6_load_m":
            initResponse = await sv6.getSV6LoadMData(req.contents.game.refid._text);
            break;
        case "game.sv6_frozen":
            initResponse = await sv6.getSV6FrozenData();
            break;
        case "game.sv6_load_r":
            initResponse = await sv6.getSV6RivalData(req.contents.game.refid._text);
            break; 
        case "game.sv6_save_m":
            initResponse = await sv6.saveSV6Score(req.contents._attributes.tag, req.contents.game);
            break;
        case "game.sv6_save_e":
            initResponse = await sv6.getSV6SaveEData();
            break;
        case "game.sv6_save_c":
            initResponse = await sv6.SaveSV6SkillData(req.contents._attributes.tag, req.contents.game);
            break;
        case "game.sv6_play_s":
            initResponse = await sv6.getSV6PlaySData();
            break;
        case "game.sv6_lounge":
            initResponse = await sv6.getSV6LoungeData();
            break;
        case "game.sv6_save":
            initResponse = await sv6.saveSV6(req.contents._attributes.tag, req.contents.game.refid._text, req.contents.game);
            break;
        case "game.sv6_entry_s":
            initResponse = await sv6.getSV6EntrySData(req.contents._attributes.tag, req.contents.game);
            break;
        default:
            res.sendStatus(400);
            return;   
    }
    if (!initResponse) {res.sendStatus(403); return;}
    const ciphered = encryptHTTP(initResponse, log, compress, encrypt)
    if (ciphered.key !== null) res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    if (compress) res.set('X-Compress', "lz77");
    res.send(ciphered.body);
})

router.post("/core/KFC*/services/get", (req, res) => {
    const initResponse = objectFactory.getInitResponseObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("//KFC*/services/get", (req, res) => {
    const initResponse = objectFactory.getInitResponseObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

module.exports = router