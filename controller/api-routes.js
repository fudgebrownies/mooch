var db = require("../models");

module.exports = function (app) {
var users=[]
    app.get("/", function (req, res) {
     
     
      // console.log(users);
      
      res.render("index", users[0]);

      // });
      // res.render(path.join(__dirname, "index.html"));
      // res.render("index");
    });
    app.get('/add', function (req, res) {


      res.render('addProduct')
    })
    app.get('/new/user', function (req, res) {


      res.render('registration')
    })


    app.get("/index/:user", function (req, res) {
      // db.users.findOne
      // console.log(req.params.user.users)
      db.users.findOne({
        where: {
          email: req.params.user
        }
      }).then(function (db) {
        var currentUser = {
          id: db.dataValues.id,
          email: db.dataValues.email,
          password: db.dataValues.password,
          firstName: db.dataValues.firstName,
          lastName: db.dataValues.lastName,
          profilePic: db.dataValues.profilePic,
          phoneNumber: db.dataValues.phoneNumber,
          address: db.dataValues.address,
          signedInStatus: db.dataValues.signedIn
        }
        // console.log(currentUser);
        res.json({
          currentUser
        })

      });
    });

    app.put("/signIn", function (req, res) {
          // console.log(req.body)
          db.users.update({
            signedIn: true
          }, {
            where: {
              email: req.body.email
            }
          }).then(function () {
            
            db.users.findOne({
              where: {
                email: req.body.email
              }
            }).then(function (db) {
              var currentUser = {
                id: db.dataValues.id,
                email: db.dataValues.email,
              
                firstName: db.dataValues.firstName,
                lastName: db.dataValues.lastName,
                profilePic: db.dataValues.profilePic,
                phoneNumber: db.dataValues.phoneNumber,
                address: db.dataValues.address,
                signedIn: db.dataValues.signedIn
        }
     
            users.push(currentUser)
            // console.log(currentUser)
            // console.log(users)
           
             res.redirect(303,'/')
      

            })
          })
        })
        
        app.put('/signOut',function(req,res){
          console.log('i am bfore you whore')
          console.log(req.body)
          db.users.update({
            signedIn: false
          }, {
            where: {
              email: req.body.email
            }
          })
        })

          app.post("/api/item", function (req, res) {
          
            // console.log(req.body)
            // var a = req.body.email
            // console.log(JSON.parse(a));
            db.product.create({
                email: req.body.email,
                category: req.body.category,
                product_name: req.body.product_name,
                product_description: req.body.product_description,
                userUploadImage1: req.body.userUploadImage1,
                userUploadImage2: req.body.userUploadImage2,
                daily: req.body.daily,
                weekly: req.body.weekly,
                monthly: req.body.monthly,
                security_deposit: req.body.security_deposit
              })
              .then(function (dbPost) {
                res.json(dbPost);
              })



            app.post("/api/new/users", function (req, res) {
             
              // console.log(req.body)
              // var a = req.body.email
              // console.log(JSON.parse(a));
              db.users.create({
                  username: req.body.username,
                  password: req.body.password,
                  profilePic: req.body.profilePice,
                  phoneNumber: req.body.phoneNumber,
                  address: req.body.address,


                })
                .then(function (dbPost) {
                  res.json(dbPost);
                })
            })

          });
        }