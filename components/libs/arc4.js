const sercretKey = require("../../config.json").eamuse_secretKey
const md5 = require("md5");
const arc4 = require("arc4");

function strToHexBytes(hexString) {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }
    var numBytes = hexString.length / 2;
    var byteArray = ''
    for (var i=0; i<numBytes; i++) {
        byteArray += parseInt(hexString.substr(i*2, 2), 16).toString();
    }
    return byteArray;
}

function headerToKey(eamuseHeader){
    const headerKey = eamuseHeader.split("-")
    const fullKey = headerKey[1] + headerKey[2] + _secretKey
    const rawKey = strToHexBytes(fullKey)
    arc4Key = md5(rawKey)
    return arc4Key
}