const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user",{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phone : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    designation : {
        type : Sequelize.STRING,
        allowNull : false
    }
});


module.exports = User;