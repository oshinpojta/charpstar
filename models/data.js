const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Data = sequelize.define("data",{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    link : {
        type : Sequelize.STRING,
        allowNull : false
    },
    status : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    },
    comment : {
        type : Sequelize.STRING
    }
});


module.exports = Data;