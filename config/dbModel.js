// Here we call model function with sequelize becasue then model/table created in db.
// We store their Instances in the obejct so that will use another files as well.
const {sequelize} = require("../config/db");
const urlModel = require("../models/url");
const authUserModel = require("../models/authUsers");

const dbModels = {};
dbModels.urlModel = urlModel(sequelize);  // here we call the function which we created inside the model, and then store the instance in the mentioned obj with the same name of table which we created inside the db.
dbModels.authUserModel = authUserModel(sequelize);

module.exports = {dbModels};