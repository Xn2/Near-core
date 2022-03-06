const express = require("express")
const session = require('express-session')
const passport = require('passport')
const xmlparser = require('express-xml-bodyparser');
const app = express();
const router = require('./router.js')

app.use(defaultContentType)
app.use(xmlparser());
app.use(express.raw())
app.use(express.json());
app.use(session({ secret : genSessionSecret(), resave: true, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)


function defaultContentType (req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/octet-stream';
    next();
}

function genSessionSecret(){
    let secret = ""
    const alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ"
    for (let i = 0; i < 32; i++){
        secret += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return secret
}

module.exports = app