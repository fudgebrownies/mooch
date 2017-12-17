

var db = require("../models");

fileKey=require("./sendfile key.js")
zipcodeKeys=require("./zipcodekey")

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
findAllProductsArray=[];
  app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
    //console.log(req.files.key)
    
    //var image = file.originalname
    
});

  app.get("/", function (req, res) {
  //  console.log({zipcodeKeys})
  // console.log(users[0])
  console.log(userproducts)
    res.render("index", {users:users[0],userProducts:userproducts});
    

  
  });
  app.post('/product/find',function(req,res){
    https://www.zipcodeapi.com/rest/<api_key>/distance.<format>/<zip_code1>/<zip_code2>/<units>
    console.log(req.body)
    db.products.findOne({
      where:{
        product_name:sc
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


    res.render('registration', {users:users[0],userProducts:userproducts})
  })

  app.get('/user/products', function (req, res) {


    res.render('userProductList', {users:users[0],userProducts:userproducts})
  })
  

  app.get('/find/all/products',function(req,res){
res.render('allproducts',{users:users[0],allProd:findAllProductsArray})
  })

app.post('/find/all',function(req,res){
console.log(req.body)

db.products.findAll({
 

  
}).then(function(findAllProducts){
// console.log(findAllProducts);
for (var i = 0; i < findAllProducts.length; i++) {
  findAllProductsArray.push(findAllProducts[i].dataValues)

}
console.log(findAllProductsArray)
res.redirect('/find/all/products')
})



  // res.render('allproducts')
})
  app.get("/index/:user", function (req, res) {
    // db.users.findOne
    // console.log(req.params.user.users)
    db.users.findOne({
      where: {
        email: req.params.user
      }
    }).then(function (db) {
  address=    db.dataValues.address.split(' ')
   console.log(address)
      var currentUser = {
        id: db.dataValues.id,
        email: db.dataValues.email,
        password: db.dataValues.password,
        firstName: db.dataValues.firstName,
        lastName: db.dataValues.lastName,
        profilePic: db.dataValues.profilePic,
        phoneNumber: db.dataValues.phoneNumber,
       
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
         splitAddy=    db.dataValues.address.split(' ');
          homeAdress=splitAddy[0]+' '+ splitAddy[1];
          homeCity=splitAddy[2];
          homeState=splitAddy[3];
          homeZipCode=splitAddy[4]
          
          
          var currentUser = {
            id: db.dataValues.id,
            email: db.dataValues.email,

            firstName: db.dataValues.firstName,
            lastName: db.dataValues.lastName,
            profilePic: db.dataValues.profilePic,
            phoneNumber: db.dataValues.phoneNumber,
            address: homeAdress,
            city:homeCity,
            state:homeState,
            zipCode:homeZipCode,
            signedIn: db.dataValues.signedIn
          }

          users.push(currentUser)
          // console.log(currentUser)
          // console.log(users)

       


        })
      })
      .then(function () {
        db.products.findAll({
          where: {
            email: req.body.email
          }
        }).then(function (prod) {

          // console.log(db[2])
          for (var i = 0; i < prod.length; i++) {
            userproducts.push(prod[i].dataValues)

          }
          
          userNProducts = {
            user: users[0],
            userproducts: userproducts
          };
          console.log('jksfnk')
          console.log(userproducts)
          userNProductsArray.push(userNProducts)
          console.log('fuck you')
          console.log(userNProductsArray.userproducts)
          res.redirect(303, '/')
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

        res.render('verification', {users:users[0],userProducts:userproducts})

      })
    })
  })

  app.post("/api/new/users", function (req, doIt) {
    console.log('hi')
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
    res.render('userProfile', {users:users[0],userProducts:userproducts})
  })

  app.get('/edit/profile', function (req, res) {
    res.render('editProfile', {users:users[0],userProducts:userproducts})
  })
  app.get('/add/products', function (req, res) {


    res.render('addProduct', {users:users[0],userProducts:userproducts})
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
