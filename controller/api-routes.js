var db = require("../models");
//fileKey=require("./sendfile key")
aws = require('aws-sdk'),
bodyParser = require('body-parser'),
multer = require('multer'),
multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: 'YYJuKJAiNALjpDYWmr+vb32VO5Og9Gn1dVdl5klV',
  accessKeyId: 'AKIAIWBUJA6Q4AU6FSBA',
  region: 'us-west-1'
});

s3 = new aws.S3();




module.exports = function (app) {

  var image 
  var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'moochify',
        key: function (req, file, cb) {
            //console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
            var image = file.originalname
        }
    })
  });
  

  app.use(bodyParser.json());

  var users = [];
  userproducts = [];
  userNProductsArray = [];

  app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
    //console.log(req.files.key)
    
    //var image = file.originalname
    
});

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

  app.post("/api/new/users", function (req, res) {
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

        href='href="localhost:8000.com/email/verification/' + req.body.email
        const msg = {
          to: req.body.email,
          from: 'moochsell@donotreply.com',
          subject: 'Reqister Your Email You Mooch Sell ',
          text: name + ' ' + 'Please Click The Link to Register Your Email <br> <a>http://localhost:8000/email/verification/' + req.body.email+'</a>',
          html: '<strong>' + name + ' ' + 'Please Click The Link to Register Your Email <br> <a href=localhost:8000.com/email/verification/' + req.body.email+'>' +'localhost:8000.com/email/verification/' + req.body.email  +'</a>' + '</strong>',
        };
        sgMail.send(msg);
        console.log('done')

        res.redirect('/')
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



}