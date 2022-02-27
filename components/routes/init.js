const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')
const objectFactory = require('../libs/objectFactory.js')
const config = require("../../config.json")

router.use(decryptHTTP)

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

module.exports = router