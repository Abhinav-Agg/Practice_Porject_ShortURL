// pauthusers -> practice authentication users model
const { DataTypes} = require("sequelize");

const model = (sequelize) => {
    let cols = {
        UserName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        IsDeleted : {
            type : DataTypes.INTEGER
        },
        Role : {
            type : DataTypes.STRING(20)
        }        
    }

    const options = {
        freezeTableName: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,
        indexes : [
            {
                fields : ["Email"],
                unique : true
            }
        ] 
    }

    return sequelize.define("AuthUsers",cols,options);
}

module.exports = model;