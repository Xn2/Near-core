const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')

router.post('/testBinARC4LZDec', decryptHTTP, (req, res) => {
    res.send(req.contents);
});

router.post('/testBinARC4LZEnc', (req, res) => {
    const encrypt = encryptHTTP(req.rawBody)
    res.set('x-eamuse-info', encrypt.key)
    res.send(encrypt.body)
});

module.exports = router