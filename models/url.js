const {Sequelize, DataTypes} = require("sequelize");

const model = (sequelize) => {
    const cols = {
        shortId : {
            type : DataTypes.STRING,
            allowNull : false
        },
        uuid : {
            type : DataTypes.STRING(255),
            allowNull : false,
        },
        redirectURL : {
            type : DataTypes.STRING,
        },
        createdAt : {type : DataTypes.DATE},
        // If we use correct datatype so will add columns in the existing table as well.
        CountVisits : {
            type : DataTypes.INTEGER
        },
        VisitTime : {
            type : DataTypes.DATE
        },
        // This is foreign key column. By below code we can add foreign key column.
        CreatedBy : {
            type : DataTypes.INTEGER,
            references : {
                model : "AuthUsers",
                key : "id"
            }
        }
    }

    const options = {
        freezeTableName: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    }

    return sequelize.define("Urls", cols, options);
    // sequelize.define(tablename columns, extras);
}

// sequelize also createby own

module.exports = model;
