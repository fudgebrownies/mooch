//Require NPM packages needed to create a server
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var exphbs = require("express-handlebars");

//hash passwords
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
process.env.SECRET_KEY="myBadAss"
//authenication  
// var session = require('express-session')
// var passport=require('passport')
// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
//Set up express APP and create PORT to start listening to 
var app = express();
var PORT = process.env.PORT || 8000;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// var router = express.Router();

// router.post('/register',login.register);
// router.post('/login',login.login)
// app.use('/api', router);
//Set up express app to process data parsing 
//parses json data
app.use(bodyParser.json());
//parses urlencoded bodies 
app.use(bodyParser.urlencoded({ extended: true}));
//parses text 
app.use(bodyParser.text());

// //link libraries / sscript files to this folder
app.use(express.static("public/assets"));

// var options = {
//   host: 'thh2lzgakldp794r.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   user: 'i6vus315cnsg0ny3',
//   password: 'gqpg5vcnjgjb2vs4',
//   database: 'h86seikwmg60df0v'
// };
// var sessionStore = new MySQLStore(options);
// app.use(session({
//   secret: 'gkjheikghkfjkgk',
//   resave: false,
//   store: sessionStore,
//   saveUninitialized: false,
//   // cookie: { secure: true }
// }))
// app.use(passport.initialize());
// app.use(passport.session());

require("./controller/api-routes.js")(app);
// require("./controller/html-routes.js")(app);

db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });