//INstall seqeulize NPM package to create connection to data base. 
var Sequelize = require("sequelize");

//create connection to MYSQL DB
var product = new Sequelize("product_list", "root", "danniboi82", {
    host: "localhost",
    dialect: "mysql",
    pool : {
        max: 5,
        min: 0,
        idel: 10000,
    }
});


//Export connection to file in models folder to create POST/PUT/DESTORY modeels
module.exports = product; 