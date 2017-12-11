var db = require("../models");

module.exports=function(app){

app.get("/", function(req, res) {
    // res.render(path.join(__dirname, "index.html"));
    res.render("index");
  });
}