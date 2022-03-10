const router = require('express').Router()
const express = require('express')

router.use('/web', express.static(__dirname + '/components/front/public'));

module.exports = router