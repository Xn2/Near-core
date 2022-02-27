const express = require("express")
const app = express();
const router = require('./router.js')
const xmlparser = require('express-xml-bodyparser');
const { decryptHTTP } = require('./libs/crypto.js')


app.use(xmlparser());
app.use(express.raw())
app.use(decryptHTTP)
app.use(router)

module.exports = app