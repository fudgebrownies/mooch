var db = require("../models");
fileKey=require("./sendfile key")
module.exports = function (app) {

  var users = [];
  userproducts = [];
  userNProductsArray = [];

  app.get("/", function (req, res) {
    // console.log('i ma here bfore your bitch')
    // // console.log(userproducts)
    // console.log('wrapers')
    // //console.log(userproducts)
    // console.log('end wrappepr')

    userNProducts = {
      user: users[0],
      userproducts: userproducts[1]
    };

    userNProductsArray.push(userNProducts)
    // console.log(users);
    // console.log('i ma jfinfknkfnkerknrknk')
    // console.log(userNProductsArray)
    res.render("index", users[0]);

    // });
    // res.render(path.join(__dirname, "index.html"));
    // res.render("index");
  });
  app.get('/search',function(req,res){
    db.products.findOne({
      where:{
        product_name:"%'+req.query.key+'%"
      }
    }).then(function (items){
    // connection.query('SELECT first_name from TABLE_NAME where first_name like "%'+req.query.key+'%"',
    // function(err, rows, fields) {
      console.log(items)
    // if (err) throw err;
    var data=[];
    // for(i=0;i<rows.length;i++)
    // {
    // data.push(rows[i].product_name);
    // }
    // res.end(JSON.stringify(data));
    });
    });
  app.get('/add', function (req, res) {


    res.render('addProduct')
  })
  app.get('/new/users', function (req, res) {


    res.render('registration', users[0])
  })

  app.get('/user/products', function (req, res) {


    res.render('userProductList', users[0])
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

          res.redirect(303, '/')


        })
      })
      .then(function () {
        db.products.findAll({
          where: {
            email: req.body.email
          }
        }).then(function (db) {


          // console.log(db[2])
          for (var i = 0; i < db.length; i++) {
            userproducts.push(db[i].dataValues)

          }
        })
      })
  })
  app.get('/email/verification/:email?', function (req, res) {

    db.users.findOne({
      where: {
        email: req.params.email
      }
    }).then(function (data) {

      console.log(data.dataValues.email)
      var user = {

        email: data.dataValues.email,

        firstName: data.dataValues.firstName,

        profilePic: data.dataValues.profilePic,
      }

      db.users.update({
        verified: true
      }, {
        where: {
          email: data.dataValues.email
        }
      }).then(function () {

        res.render('verification', user)

      })
    })
  })

  app.post("/api/new/users", function (req, doIt) {
    var name = req.body.firstName + ' ' + req.body.lastName



    // var a = req.body.email
    // console.log(JSON.parse(a));
    db.users.create({

        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        agreeTerms: req.body.agreeTerms

      })
      .then(function (dbPost) {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(fileKey);

        href="<a href='localhost:8000.com/email/verification/"
        email=req.body.email+ "'"+"> Click Here To Register <a/>"
        var fullEmail = href.concat(email);
    console.log(fullEmail)
        const msg = {
          to: req.body.email,
          from: 'moochsell@donotreply.com',
          subject: 'Reqister Your Email With Mooch Sell ',
          text: name + ' ' + "Please Click The Link to Register Your Email https://mooch-sell.herokuapp.com//email/verification/"+req.body.email,
          // html: '<strong>' + name + ' ' + 'Please Click The Link to Register Your Email <br> </strong>',
        };
         sgMail.send(msg);
        console.log('done')

        doIt.redirect(303, '/')
        
      })
  })
  app.put('/signOut', function (req, res) {

    console.log(req.body)
    db.users.update({
      signedIn: false
    }, {
      where: {
        email: req.body.email
      }
    }).then(function () {
      res.redirect(303, '/')
      users.splice('')
      console.log(users)
    })
  })

  app.get('/user/profile', function (req, res) {
    res.render('userProfile', users[0])
  })

  app.get('/edit/profile', function (req, res) {
    res.render('editProfile', users[0])
  })
  app.get('/add/products', function (req, res) {


    res.render('addProduct', users[0])
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
            })


            app.post("/api/new/users", function (req, res) {
             
              console.log(req.body)
              // var a = req.body.email
              // console.log(JSON.parse(a));
              db.users.create({

                  email: req.body.email,
                  password: req.body.password,
                  firstName:req.body.firstName,
                  lastName:req.body.lastName,
                  profilePic: req.body.profilePic,
                  phoneNumber: req.body.phoneNumber,
                  address: req.body.address,


                })
                .then(function (dbPost) {
                  res.json(dbPost);
                })
            })
          }
