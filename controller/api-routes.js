var bcrypt = require('bcrypt');
const saltRounds = 10;
var moment = require('moment');
var db = require("../models");
// var keys = require("./keys.js");
// var facebook = process.env.FB || keys.facebook.password;
var sengrido = process.env.sendgrid
// var jwt = require('jwt-simple');
// fileKey=require("./sendfile key.js")
// var express = require("express");
// var bodyParser = require("body-parser");
// var passport = require('passport')
// var session = require('express-session');
//fileKey=require("./sendfile key")
aws = require('aws-sdk'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  multerS3 = require('multer-s3');
aws.config.update({
  accessKeyId: process.env.s3_key,
  secretAccessKey: process.env.s3_secret
});
// var jwtauth = require('./jwtauth.js');

var jwt = require('jsonwebtoken');
var secret = process.env.jwt_secret || 'gklengknekrgnklengka'

s3 = new aws.S3();





module.exports = function (app) {


  app.set('jwtTokenSecret', process.env.jwt_secret || 'kwefkjfknwdnmqklmnlk*((*(');
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'techcheckbucket',
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, file.originalname); //use Date.now() for unique file keys
        //var imagePath = file.originalname

      }


    })
  });


  app.use(bodyParser.json());
  var arrayOfPeopleRent = [];
  const users = [];
  userproducts = [];
  userNProductsArray = [];



  app.post('/upload', upload.array('upl', 1), function (req, res, next) {

    res.send("Uploaded!");
    //console.log(req.files.key)

    //var image = file.originalname

  });
  app.delete('/post/delete', function (req, res) {
    console.log("im hungry")
    // console.log(req.body)
    db.products.destroy({
      where: {
        id: req.body.number
      }
    }).then(function (deleteItem) {
      //console.log(deleteItem)
      res.redirect(303, '/user/products')
    })
  })
  //[bodyParser.json(), jwtauth]
  app.get("/", function (req, res) {
   // console.log(req._parsedOriginalUrl.query)
    //  console.log({zipcodeKeys})
    // console.log(users[0])
    console.log(req._parsedOriginalUrl.query)
    var user1;
if(req._parsedOriginalUrl.query != null){


    jwt.verify(req._parsedOriginalUrl.query, secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {

        // if everything is good, save to request for use in other routes
        req.decoded = decoded;      
        
      // console.log(decoded.auth)
        user1=decoded.auth
        
      }
    });
  }
  console.log('JWT')
  console.log(user1)
    // console.log(userproducts)
    res.render("index", {
      users: users[0],
    

    });



  });

  app.post("/signIn", function (req, res) {
    // function generateToken(done){
    //   // secret is defined in the environment variable JWT_SECRET
    //   return token
    // }

    db.users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (checkUser) {
      // console.log(checkUser)


      bcrypt.compare(req.body.password, checkUser.password).then(function (pass) {
        if (pass == true && req.body.email == checkUser.email) {
          // console.log('you got it write')

          // console.log(token)
          splitAddy = checkUser.dataValues.address.split(' ');
          homeAdress = splitAddy[0] + ' ' + splitAddy[1];
          homeCity = splitAddy[2];
          homeState = splitAddy[3];
          homeZipCode = splitAddy[4]
          var fullName = checkUser.dataValues.firstName + ' ' + checkUser.dataValues.lastName;
          const currentUser = {
            id: checkUser.dataValues.id,
            email: checkUser.dataValues.email,
          
            firstName: checkUser.dataValues.firstName,
            lastName: checkUser.dataValues.lastName,
            fullName: fullName,
            profilePic: checkUser.dataValues.profilePic,
            phoneNumber: checkUser.dataValues.phoneNumber,
            address: homeAdress,
            city: homeCity,
            state: homeState,
            zipCode: homeZipCode,
            verified:checkUser.verified


          }
         users.push(currentUser)
        // console.log(currentUser)
          var token = jwt.sign({
            auth: currentUser,
            agent: req.headers['user-agent'],
            currentUser:{ currentUser },
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // Note: in seconds!
          }, secret);

          //console.log(token)
          // res.render("index", {
          //   users:currentUser,
          //   token 
      
      
          // });
      
          
          res.redirect(303, '/')
         
        } else {
          res.json('wrong')
          console.log('you got it wrong')
        }


      });

    })
 






  })
  app.post('/product/find', function (req, res) {

   // https: //www.zipcodeapi.com/rest/<api_key>/distance.<format>/<zip_code1>/<zip_code2>/<units>
      //console.log(req.body)

      db.products.findOne({
        where: {
          product_name: sc
        }

      }).then(function (items) {
        // connection.query('SELECT first_name from TABLE_NAME where first_name like "%'+req.query.key+'%"',
        // function(err, rows, fields) {
        //  console.log(items)
        // if (err) throw err;
        var data = [];
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


    res.render('registration', {
      users: users[0],
      userProducts: userproducts
    })
  })
  
  app.get('/user/products/:email', function (req, res) {
    console.log(req.params.email)
    userProductPageArray = [];
    if (userProductPageArray < 1) {
      console.log('i am less than 1')
      db.products.findAll({
        where: {
          email: req.params.email
        }
      }).then(function (prod) {


        console.log(prod[0])
        // console.log(db[2])
        for (var i = 0; i < prod.length; i++) {
          userProductPageArray.push(prod[i].dataValues)

        }

      }).then(function () {
        res.render('userProductList', {
          users: users[0],
          userProducts: userProductPageArray
        })
      })




    }
    // var myInt = setTimeout(function () {
    //   userproducts = []w
    // }, 500000);




  })
  app.get('/find/all/products', function (req, res) {
    findAllProductsArray = [];

    if (findAllProductsArray < 1) {

      db.products.findAll({



      }).then(function (findAllProducts) {

        for (var i = 0; i < findAllProducts.length; i++) {
          findAllProductsArray.push(findAllProducts[i].dataValues)

        }
      }).then(function () {
        res.render('allproducts', {
          users: users[0],
          allProd: findAllProductsArray
        })
        var myInt = setTimeout(function () {
          findAllProductsArray = []
        }, 500000);
      })
    }


    // findAllProductsArray.splice(findAllProductsArray.le)
    // console.log('klefnkansjkfnkjanfkjwenkfrekjgnkjnkjnkjnk')
    // console.log(findAllProductsArray)
  })



  app.get("/users/profile/:user", function (req, res) {

    // db.users.findOne
    // console.log(req.params.user.users)
    console.log('iam here')
    console.log(req.params.user)
    db.users.findOne({
      where: {
        email: req.params.user
      }
    }).then(function (db) {
console.log(db)
      splitAddy = db.dataValues.address.split(' ');
      homeAdress = splitAddy[0] + ' ' + splitAddy[1];
      homeCity = splitAddy[2];
      homeState = splitAddy[3];
      homeZipCode = splitAddy[4]




      var currentUser = {
        id: db.dataValues.id,
        email: db.dataValues.email,
        password: db.dataValues.password,
        firstName: db.dataValues.firstName,
        lastName: db.dataValues.lastName,
        profilePic: db.dataValues.profilePic,
        phoneNumber: db.dataValues.phoneNumber,
        address: homeAdress,
        city: homeCity,
        state: homeState,
        zipCode: homeZipCode,


      }
      // console.log(currentUser);
      res.render('viewPeople', {
        users: users[0],
        currentUser: currentUser
      })


    });
  });
  var changeArray = [];

  app.get('/users/requests/:email?', function (req, res) {
    requestArray = [];
    theItems = [];

    function NewRequest(id, owner, renter) {
      this.theProduct = id;
      this.ownerEmail = owner;
      this.renterEmail = renter;
    };

    function MoochItems(id, email, cat, name, describe, zip, photo1, photo2, day, week, month, dep) {
      this.theId = id;
      this.pEmail = email;
      this.pCat = cat
      this.pName = name;
      this.pDescribtion = describe;
      this.pZip = zip;
      this.pPhoto1 = photo1;
      this.pPhoto2 = photo2;
      this.pDaily = day;
      this.pWeekly = week;
      this.pMonthly = month;
      this.pDeposit = dep;
    };

    var theEmail = req.params.email
    db.requests.findAll({
      where: {
        emailRequestee: theEmail

      }

    }).then(function (request) {
      // console.log(request)
      for (var i = 0; i < request.length; i++) {
        var mooching = new NewRequest(request[i].dataValues.productId, request[i].dataValues.emailRequestee, request[i].dataValues.emailRequester);
        requestArray.push(mooching);

      }
      // console.log(requestArray)

      db.products.findAll({
        where: {
          email: theEmail
        }
      }).then(function (items) {
        // console.log(items)

        for (var i = 0; i < items.length; i++) {


          var Moochables = new MoochItems(items[i].dataValues.id,
            items[i].dataValues.email,
            items[i].dataValues.category,
            items[i].dataValues.product_name,
            items[i].dataValues.product_description,
            items[i].dataValues.zipcode,
            items[i].dataValues.userUploadImage1,
            items[i].dataValues.userUploadImage2, items[i].dataValues.daily, items[i].dataValues.weekly, items[i].dataValues.monthly, items[i].dataValues.security_deposit)
          theItems.push(Moochables)

        }
        // console.log(requestArray)

        function ShowRenters(id, email, cat, name, describe, zip, photo1, photo2, day, week, month, dep, rentEmail) {
          this.theId = id;
          this.pEmail = email;
          this.pCat = cat
          this.pName = name;
          this.pDescribtion = describe;
          this.pZip = zip;
          this.pPhoto1 = photo1;
          this.pPhoto2 = photo2;
          this.pDaily = day;
          this.pWeekly = week;
          this.pMonthly = month;
          this.pDeposit = dep;
          this.rentersEmail = rentEmail;
        }

        for (var i = 0; i < requestArray.length; i++) {

          for (var b = 0; b < theItems.length; b++) {
            //console.log("boo")
            if (requestArray[i].theProduct == theItems[b].theId) {
              //   console.log("hi")
              var objectToRent = new ShowRenters(theItems[b].theId, theItems[b].pEmail,
                theItems[b].pCat,
                theItems[b].pName,
                theItems[b].pDescribtion,
                theItems[b].pZip,
                theItems[b].pPhoto1,
                theItems[b].pPhoto2, theItems[b].pDaily, theItems[b].pWeekly, theItems[b].pMonthly, theItems[b].pDeposit, requestArray[i].renterEmail)
              arrayOfPeopleRent.push(objectToRent)
              //  console.log(objectToRent)
            }
          }
        }
        // console.log('showrenters')

        for (var i = 0; i < arrayOfPeopleRent.length; i++) {
          var moochingobjects = {
            id: arrayOfPeopleRent[i].theId,
            emaiil: arrayOfPeopleRent[i].pEmail,
            category: arrayOfPeopleRent[i].pCat,
            productName: arrayOfPeopleRent[i].pName,
            productDescribtion: arrayOfPeopleRent[i].pDescribtion,
            zipcode: arrayOfPeopleRent[i].pZip,
            Photo1: arrayOfPeopleRent[i].pPhoto1,

            Daily: arrayOfPeopleRent[i].pDaily,
            Weekly: arrayOfPeopleRent[i].pWeekly,
            Monthly: arrayOfPeopleRent[i].pMonthly,
            Deposit: arrayOfPeopleRent[i].pDeposit,
            rentersEmail: arrayOfPeopleRent[i].rentersEmail

          }
          changeArray.push(moochingobjects)
        }
        //  console.log(moochingobjects)
        res.render('pendingRequest', {
          users: users[0],
          renterStuff: changeArray
        })


        // console.log(arrayOfPeopleRent)
      }).then(function () {
        var myInt = setTimeout(function () {
          changeArray = [];
          requestArray = [];
          arrayOfPeopleRent = [];
        }, 500);
      })


      // var theRequestedId=  request[i].dataValues.productId
      //   var ownerOfItem=request.dataValues.emailRequestee
      //   var personRenting=request.dataValues.emailRequester

      //   db.products.
    })

  })

  app.post('/new/request', function (req, res) {

    var requestingEmail = req.body.requestEmail
    var requestProductId = req.body.requestId
    db.products.findOne({
      where: {
        id: requestProductId
      }

    }).then(function (itemRequest) {



      db.requests.create({
        emailRequester: requestingEmail,
        emailRequestee: itemRequest.dataValues.email,
        productId: requestProductId
      })
    })

  })


  app.get('/email/verification/:email?', function (req, res) {

    db.users.findOne({
      where: {
        email: req.params.email
      }
    }).then(function (data) {

      //console.log(data.dataValues.email)
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

        res.render('verification', {
          users: users[0],
          userProducts: userproducts
        })

      })
    })
  })

  app.post("/api/new/users", function (req, doIt) {
    //console.log('hi')


    var name = req.body.firstName + ' ' + req.body.lastName



    // var a = req.body.email
    // console.log(JSON.parse(a));
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      if (err) {


        console.log(err)
      }
      db.users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (data) {
        if (data != null) {

          console.log('bitches fnjksafnakKn')
          doIt.json('already')


        }
else{




      db.users.create({

          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePic: req.body.profilePic,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          agreeTerms: req.body.agreeTerms

        })
        .then(function (dbPost) {



          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(sengrido);

          href = "<a href='localhost:8000.com/email/verification/"
          email = req.body.email + "'" + "> Click Here To Register <a/>"
          var fullEmail = href.concat(email);

          //   console.log(fullEmail)

          const msg = {
            to: req.body.email,
            from: 'moochsell@donotreply.com',
            subject: 'Reqister Your Email With Mooch Sell ',
            text: name + ' ' + "Please Click The Link to Register Your Email" + " " + "https://mooch-sell.herokuapp.com/email/verification/" + req.body.email
            // html: '<strong>' + name + ' ' + 'Please Click The Link to Register Your Email <br> </strong>',
          };

          sgMail.send(msg);
          var user_id = dbPost.dataValues.id

          console.log('done')




          doIt.redirect(303, '/')

        })



      }


    })

    });
  })

  // passport.serializeUser(function(user_id, done) {
  //   done(null, user_id);
  // });

  // passport.deserializeUser(function(user_id, done) {
  //   done(null, user_id);
  // });
  app.put('/signOut', function (req, res) {
    users.splice(0, users.length);

    //  console.log(req.body)
    db.users.update({
      signedIn: false
    }, {
      where: {
        email: req.body.email
      }
    }).then(function () {
      /// console.log(userProducts)
      res.redirect(303, '/')

      userproducts.splice(0, userproducts.length)
      // console.log(users)
    })
  })

  app.get('/user/profile/:email', function (req, res) {
    res.render('userProfile', {
      users: users[0],
      userProducts: userproducts
    })
  })

  app.get('/edit/profile', function (req, res) {
    res.render('editProfile', {
      users: users[0],
      userProducts: userproducts
    })
  })
  app.get('/add/products', function (req, res) {


    res.render('addProduct', {
      users: users[0],
      userProducts: userproducts
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


  app.post("/api/item", function (req, res) {


    console.log(req.body)
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,


      })
      .then(function (dbPost) {
        res.json(dbPost);
      })
  })
}