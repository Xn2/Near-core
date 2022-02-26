const express = require("express")
const app = express();
const router = require('./router.js')
const xmlparser = require('express-xml-bodyparser');


app.use(xmlparser());
app.use(express.raw())
app.use(router)

module.exports = app