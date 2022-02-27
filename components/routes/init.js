const router = require('express').Router()
const { fromKbinXML, toKbinXML } = require('../libs/kbinxml.js')
const { LZ77Compress, LZ77Decompress } = require('../libs/lz77.js')
const arc4 = require('../libs/arc4')
const fs = require('fs')

router.post('/testBinDec', (req, res) => {
    const parsed = fromKbinXML(req.body)
    res.send(parsed)
});

router.post('/testBinLZDec', (req, res) => {
    const decompressed = Buffer.from(LZ77Decompress(req.body));
    const parsed = fromKbinXML(decompressed)
    res.send(parsed)
});

router.post('/testBinEnc', (req, res) => {
    const parsed = toKbinXML(req.rawBody)
    res.send(parsed)
});

router.post('/testBinLZEnc', (req, res) => {
    const enc = Buffer.from(toKbinXML(req.rawBody))
    const compressed = LZ77Compress(enc);
    res.send(compressed)
});

router.post('/testBinARC4LZDec', (req, res) => {
    res.send(req.contents);
});

module.exports = router