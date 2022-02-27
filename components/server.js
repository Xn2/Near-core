const express = require("express")
const app = express();
const router = require('./router.js')
const xmlparser = require('express-xml-bodyparser');

app.use(defaultContentType)
app.use(xmlparser());
app.use(express.raw())
app.use(router)


function defaultContentType (req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/octet-stream';
    next();
}

module.exports = app