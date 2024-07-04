// step2 -> Setup sequelize with your db.
const {Sequelize} = require('sequelize');
const config = require("../config/config");
const {development} = config;

const sequelize =  new Sequelize(
    development.database,
    development.username,
    development.password,
    {
        host: development.host,
        dialect: development.dialect
    }
)

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully!');
    }
    catch (err) {
        console.log('Can\'t establish database connection:\n' + err);
    }
}

const databaseSync = async () => {
    try{
        await sequelize.sync({ alter: true });
        console.log("tables are synced");

      }
      catch(e){
        console.error('Unable to create database & tables:', e);
      }
}

module.exports = {sequelize, connection, databaseSync};