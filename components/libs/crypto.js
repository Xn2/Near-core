const { fromKbinXML, toKbinXML } = require('../libs/kbinxml.js')
const { LZ77Compress, LZ77Decompress } = require('../libs/lz77.js')
const convert = require('xml-js');
const secretKey = require("../../config.json").eamuse_secretKey
const md5 = require("md5");
const rc4 = require("arc4");


function decryptHTTP(req, res, next) {
    if (req.headers['user-agent'] !== "EAMUSE.XRPC/1.0"){
        next(); return;
    }
    let data = req.body
    if(req.headers['x-eamuse-info']){
        const arc4key = headerToKey(req.headers['x-eamuse-info'])
        const cipher = rc4('arc4', arc4key);
        data = cipher.decodeBuffer(data);
    }
    if(req.headers['x-compress'] !== "none"){data = Buffer.from(LZ77Decompress(data))}
    const parsed = fromKbinXML(data)
    req.contents = convert.xml2js(parsed,{compact: true, spaces: 4}).call
    next()
}

function encryptHTTP(data, log=false, compress, encrypt) {
    data = convert.json2xml(data)
    key = null
    if (log) console.log(data)
    data = Buffer.from(toKbinXML(data))
    if (compress){
        data = Buffer.from(LZ77Compress(data));
    }
    if (encrypt){
        key = keyGen()
        const arc4key = headerToKey(key)
        const cipher = rc4('arc4', arc4key);
        data = cipher.encodeBuffer(data);
    }
    return {key, body : data}
}

function keyGen() {
    const alpha = "0123456789abcdef";
    let key = "1-";
    for (let i = 0; i < 13; i++) {
        if (i == 8) { key += '-' }
        else { key += alpha[Math.floor(Math.random()* alpha.length) ] }
    }
    return key
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

module.exports = { decryptHTTP, encryptHTTP }