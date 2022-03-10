const fs = require('fs');
const router = require('express').Router()
const routes = fs.readdirSync('components/routes');

for (i of routes){
    router.use(require(`./routes/${i}`))
}

module.exports = router