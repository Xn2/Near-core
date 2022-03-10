const fs = require('fs')
console.log(fs.readFileSync('./visuals/asciiart.txt').toString())

const server = require('./components/server.js')
const database = require('./components/sequelize.js')
const config = require('./config.json')

server.listen(config.listening_port)