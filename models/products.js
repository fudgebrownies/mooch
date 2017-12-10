//Require NPM packages need for file
var Sequelize = require("sequelize");

//assign variable to connection.js
var product = require("../config/connection.js");

var Product = sequelize.define("products", {
    category: Sequelize.STRING,
    product_name: Sequelize.STRING,
    product_description: Sequelize.STRING,
    userUploadImages: {
        image_1: Sequelize.STRING,
        image_2: Sequelize.STRING,
    },
    rental_cost: {
        daily: Sequelize.INTEGER,
        weekly: Sequelize.INTEGER,
        monthly: Sequelize.INTEGER,
        security_deposit: Sequelize.INTEGER
    }
}, {
        timestamps: false
    });

// SYNC fiel with Database
Product.sync();

//Export defined table to api routes 
module.exports = Product; 