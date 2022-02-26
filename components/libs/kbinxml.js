const kbinxml = require('@kamyu/kbinxml');
const fs = require('fs')

function fromKbinXML(data){
    const parsed = kbinxml.decode(data);
    const buff = Buffer.from(parsed, "base64");
    const decoded = buff.toString('ascii');
    return decoded
}

function toKbinXML(data){
    const buff = Buffer.from(data)
    const encoded = kbinxml.encode(buff);
    const buff2 = Buffer.from(encoded, 'base64');
    return buff2
}

module.exports = {fromKbinXML, toKbinXML}