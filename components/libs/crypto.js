const { fromKbinXML, toKbinXML } = require('../libs/kbinxml.js')
const { LZ77Compress, LZ77Decompress } = require('../libs/lz77.js')
const secretKey = require("../../config.json").eamuse_secretKey
const md5 = require("md5");
const rc4 = require("arc4");


function decryptHTTP(req, res, next) {
    const initialData = req.body
    const arc4key = headerToKey(req.headers['x-amuse-info'])
    console.log(arc4key)
    const cipher = rc4('arc4', arc4key);
    const deciphered = cipher.decodeBuffer(initialData);
    const decompressed = Buffer.from(LZ77Decompress(deciphered))
    const parsed = fromKbinXML(decompressed)
    req.contents = parsed
    next()
}

// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function headerToKey(eamuseHeader) {
    const headerKey = eamuseHeader.split("-")
    const fullKey = headerKey[1] + headerKey[2] + secretKey
    const rawKey = hexToBytes(fullKey)
    arc4Key = Buffer.from(md5(rawKey), "hex")
    return arc4Key
}

module.exports = { decryptHTTP }