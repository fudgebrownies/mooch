var db = require("../models");

module.exports=function(app){

app.get("/", function(req, res) {
    // res.render(path.join(__dirname, "index.html"));
    res.render("index");
  });

  app.get("/index/:user", function(req, res) {
    db.users.findAll({}).then(function(dbUsers){
     
       var currentUser={
id:dbUsers[0].id,
email: dbUsers[0].email,
password:dbUsers[0].password,
firstName:dbUsers[0].firstName,
lastName:dbUsers[0].lastName,
profilePic:dbUsers[0].profilePic,
phoneNumber:dbUsers[0].phoneNumber,
address:dbUsers[0].address,
signedInStatus:dbUsers[0].signedIn
      }
      console.log(currentUser)
      // res.send(currentUser.email);
    })
    // res.render(path.join(__dirname, "index.html"));
    // res.render();
  });
}
