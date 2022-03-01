const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')
const objectFactory = require('../libs/objectFactory.js')
const sv5 = require('../games/sv5.js')
const sv6 = require('../games/sv6.js')
const config = require("../../config.json")

router.use(decryptHTTP)

router.post('/', (req, res) => {
    if (req.query.model.substring(0,3) !== "KFC" && req.query.f !== "services.get"){
        res.send(400); return
    } 
    const initResponse = objectFactory.getInitResponseObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post('/core', async (req, res) => {
    let initResponse;
    if (req.query.model.substring(0,3) !== "KFC"){
        res.send(400); return
    }
    switch(req.query.f){
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
            initResponse = await objectFactory.getFacilityObject();
            break;
        case "pcbevent.put":
            initResponse =  objectFactory.getPcbEventObject();
            break;
        case "eventlog.write":
            initResponse = objectFactory.getEventLogObject();
            break;
        case "game.sv6_common":
            initResponse = sv6.getSV6CommonData();
            break;
        default:
            res.send(400);
            return;   
    }
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

router.post("/core/KFC*/pcbtracker/alive", (req, res) => {
    const initResponse = objectFactory.getKeepAliveResponseObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/package/list", (req, res) => {
    const initResponse = objectFactory.getPackageListObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/message/get", (req, res) => {
    const initResponse = objectFactory.getMessageObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/facility/get", async (req, res) => {
    const initResponse = await objectFactory.getFacilityObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/pcbevent/put", async (req, res) => {
    const initResponse = await objectFactory.getPcbEventObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/eventlog/write", async (req, res) => {
    const initResponse = objectFactory.getEventLogObject();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/game/sv5_common", async (req, res) => {
    const initResponse = sv5.getSV5CommonData();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/cardmng/inquire", async (req, res) => {
    const initResponse = sv5.getSV5InquireData(req.contents.cardmng._attributes.cardid);
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

router.post("/core/KFC*/cardmng/authpass", async (req, res) => {
    const initResponse = sv5.getSV5AuthpassData(req.contents.cardmng._attributes.refid, req.contents.cardmng._attributes.pass);
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})


module.exports = router