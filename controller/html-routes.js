var express = require("express");
var bodyParser = require("body-parser");


var app = express();
var PORT = process.env.PORT || 8000;


app.use(bodyParser.join());
app.use(bodyParser.urlendcoded({extended: true}));
app.use(bodyParser.text());


app.use(express.static("public"));


require("./controller/api-routes.js")(app);
require("./controller/html-routes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});

