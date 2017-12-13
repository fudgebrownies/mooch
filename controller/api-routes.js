

var db = require("../models");

module.exports=function(app){

app.get("/", function(req, res) {
    // res.render(path.join(__dirname, "index.html"));
    res.render("index");
  });
//   app.get("/index/:user", function(req, res) {
//     // Find one Author with the id in req.params.id and return them to the user with res.json
//    db.Author.findOne({
//      where: {
//        id: req.params.id
//      }
//    }).then(function(dbAuthor) {
//      res.json(dbAuthor);
//    });
//  });

  app.get("/index/:user", function(req, res) {
    // db.users.findOne
    // console.log(req.params.user.users)
    db.users.findOne({
      where: {
        email: req.params.user
     }
    }).then(function(db) {
      var currentUser={
        id:db.dataValues.id,
        email: db.dataValues.email,
        password:db.dataValues.password,
        firstName:db.dataValues.firstName,
        lastName:db.dataValues.lastName,
        profilePic:db.dataValues.profilePic,
        phoneNumber:db.dataValues.phoneNumber,
        address:db.dataValues.address,
        signedInStatus:db.dataValues.signedIn
              }
      console.log(currentUser);
      res.json({currentUser})
      
    });
  });
  app.post("/api/item", function(req, res) {
    console.log("Book Data:");
    console.log(req.body)
    // var a = req.body.email
    // console.log(JSON.parse(a));
   db.product.create({
     email: req.body.email,
     category: req.body.category,
     product_name: req.body.product_name,
     product_description: req.body.product_description,
     userUploadImage1:req.body.userUploadImage1,
     userUploadImage2:req.body.userUploadImage2,
    daily:req.body.daily,
      weekly:req.body.weekly,
       monthly:req.body.monthly,
       security_deposit:req.body.security_deposit
   })
   .then(function(dbPost) {
    res.json(dbPost);
   })
 
 

    // console.log({
    //   email: req.body.email,
    //   category: req.body.category,
    //   product_name: req.body.product_name,
    //   product_description: req.body.product_description,
    //   userUploadImage1:req.body.userUploadImage1,
    //   userUploadImage2:req.body.userUploadImage2,
    //  daily:req.body.daily,
    //    weekly:req.body.weekly,
    //     monthly:req.body.monthly,
    //     security_deposit:req.body.security_deposit
    // })
  });
}
// email:{
//   type:DataTypes.STRING
// },
// category:{
  
//       type:DataTypes.STRING},
//   product_name:{type: DataTypes.STRING},
  
//       product_description:{type: DataTypes.STRING},
//       userUploadImage1:{ type: DataTypes.STRING},
//       userUploadImage2:{type: DataTypes.STRING},
//       daily:{
//           type:DataTypes.INTEGER
//       },
//       weekly:{
//           type:DataTypes.INTEGER
//       },
//       monthly: {
//           type:DataTypes.INTEGER
//       },
//       security_deposit:{
//           type:DataTypes.INTEGER
//       }