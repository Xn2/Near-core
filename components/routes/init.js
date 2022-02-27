const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')
const objectFactory = require('../libs/objectFactory.js')
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

module.exports = router