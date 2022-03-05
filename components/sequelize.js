const { Sequelize, DataTypes } = require('@sequelize/core');
const fs = require("fs")
const path = require("path")
const config = require('../config.json')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db.sqlite',
    logging: config.sequelize_debug
});

let db = {};

async function testDBConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
    var model = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);
    db[model.name] = model;
});

testDBConnection()

sequelize.sync({
    alter: true
}).then(async () => {
    console.log('Database synchronization complete.');
}).catch(err => console.log(err));



module.exports = db