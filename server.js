//Require NPM packages needed to create a server
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
//Set up express APP and create PORT to start listening to 
var app = express();
var PORT = process.env.PORT || 8000;


//Set up express app to process data parsing 
//parses json data
app.use(bodyParser.json());
//parses urlencoded bodies 
app.use(bodyParser.urlencoded({ extended: true}));
//parses text 
app.use(bodyParser.text());

//link libraries / sscript files to this folder
// app.use(express.static("public"));


require("./controller/api-routes.js")(app);
// require("./controller/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });