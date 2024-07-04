// Step 1 -> Add connectstring here from env file becasue env file means environment in which env we have use so we get details and add here.
require("dotenv").config();
const {USER, PASSWORD, DB, HOST, DIALECT, SQL_PORT} = process.env;

module.exports = {
    development : {
    "username": USER, 
    "password": PASSWORD,
    "database": DB,
    "host": HOST,
    "SQL_PORT": SQL_PORT,
    "dialect": DIALECT,
    "dialectOptions": {
        options: { encrypt: false },
      },
    }
}