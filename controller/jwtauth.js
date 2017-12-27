var jwt = require('jwt-simple');
var db = require("./../models");
module.exports = function(req, res, next) {
  // code goes here

var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) ||req.headers['x-access-token'];
if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      db.users.findOne({ where:{

      
        id: decoded.iss }}, function(err, user) {
        req.users = user;
        console.log(user)
      });
      
      // handle token here
  
    } catch (err) {
      return next();
    }
  } else {
    next();
  }

 

};