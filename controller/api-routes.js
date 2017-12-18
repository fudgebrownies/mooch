

var db = require("../models");

// fileKey=require("./sendfile key.js")


//fileKey=require("./sendfile key")
aws = require('aws-sdk'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  multerS3 = require('multer-s3');

aws.config.loadFromPath('./controller/keys.json'); 

s3 = new aws.S3();





module.exports = function (app) {


 
  var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'moochify',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
            var imagePath = file.originalname
            
        }


    })
  });


  app.use(bodyParser.json());
  var arrayOfPeopleRent=[];
  var users = [];
  userproducts = [];
  userNProductsArray = [];

  findAllProductsArray = [];
  app.post('/upload', upload.array('upl', 1), function (req, res, next) {

    res.send("Uploaded!");
    //console.log(req.files.key)

    //var image = file.originalname
    
});
app.delete('/post/delete',function(req,res){
  console.log("im hungry")
  console.log(req.body)
 db.products.destroy({
  where:{
    id:req.body.number
  }
}).then(function(deleteItem){
  console.log(deleteItem)
  res.redirect(303,'/user/products')
})
})

  app.get("/", function (req, res) {
    //  console.log({zipcodeKeys})
    // console.log(users[0])
    console.log(userproducts)
    res.render("index", {
      users: users[0],
      userProducts: userproducts
    });



  });

  app.post('/product/find',function(req,res){

    https://www.zipcodeapi.com/rest/<api_key>/distance.<format>/<zip_code1>/<zip_code2>/<units>
    //console.log(req.body)

    db.products.findOne({
      where: {
        product_name: sc
      }

    }).then(function (items) {
      // connection.query('SELECT first_name from TABLE_NAME where first_name like "%'+req.query.key+'%"',
      // function(err, rows, fields) {
      console.log(items)
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

  app.get('/user/products', function (req, res) {


    res.render('userProductList', {
      users: users[0],
      userProducts: userproducts
    })
  })


  app.get('/find/all/products', function (req, res) {


    if (findAllProductsArray < 1) {
     
      db.products.findAll({



      }).then(function (findAllProducts) {



        // console.log(findAllProducts);

        // console.log(findAllProductsArray)


        for (var i = 0; i < findAllProducts.length; i++) {
          findAllProductsArray.push(findAllProducts[i].dataValues)

        }
      })
    }
    res.render('allproducts', {
      users: users[0],
      allProd: findAllProductsArray
    })
    var myInt = setTimeout(function () {
      findAllProductsArray = []
    }, 500000);

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
      res.render('viewPeople',{users:users[0],currentUser:currentUser})


    });
  });
  var changeArray=[];

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
console.log(requestArray)
   
function ShowRenters(id, email, cat, name, describe, zip, photo1, photo2, day, week, month, dep,rentEmail){
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
  this.rentersEmail=rentEmail;
}

        for (var i = 0; i < requestArray.length; i++) {
        
          for (var b = 0; b < theItems.length; b++) {
            console.log("boo")
            if (requestArray[i].theProduct == theItems[b].theId) {
              console.log("hi")
         var objectToRent= new ShowRenters(theItems[b].theId,theItems[b].pEmail,
          theItems[b].pCat,
          theItems[b].pName,
          theItems[b].pDescribtion,
          theItems[b].pZip,
          theItems[b].pPhoto1,
          theItems[b].pPhoto2, theItems[b].pDaily, theItems[b].pWeekly, theItems[b].pMonthly, theItems[b].pDeposit,requestArray[i].renterEmail)
          arrayOfPeopleRent.push(objectToRent)
          console.log(objectToRent)
            }
          }
        }
        console.log('showrenters')
        console.log(arrayOfPeopleRent[0].theId)
         for(var i=0;i<arrayOfPeopleRent.length;i++){
           var moochingobjects={
     id:arrayOfPeopleRent[i].theId,
    emaiil: arrayOfPeopleRent[i].pEmail,
     category: arrayOfPeopleRent[i].pCat,
     productName: arrayOfPeopleRent[i].pName,
     productDescribtion: arrayOfPeopleRent[i].pDescribtion,
     zipcode: arrayOfPeopleRent[i].pZip,
     Photo1: arrayOfPeopleRent[i].pPhoto1,
     Photo2:arrayOfPeopleRent[i].pPhoto1,
     Daily:arrayOfPeopleRent[i].pDaily,
     Weekly: arrayOfPeopleRent[i].pWeekly,
     Monthly: arrayOfPeopleRent[i].pMonthly,
     Deposit: arrayOfPeopleRent[i].pDeposit,
     rentersEmail:arrayOfPeopleRent[i].rentersEmail

}
changeArray.push(moochingobjects)
         }
         console.log(moochingobjects)
         res.render('pendingRequest', {users:users[0],renterStuff:changeArray})
   
        
        // console.log(arrayOfPeopleRent)
      }).then(function(){
        
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
          splitAddy = db.dataValues.address.split(' ');
          homeAdress = splitAddy[0] + ' ' + splitAddy[1];
          homeCity = splitAddy[2];
          homeState = splitAddy[3];
          homeZipCode = splitAddy[4]


          var currentUser = {
            id: db.dataValues.id,
            email: db.dataValues.email,

            firstName: db.dataValues.firstName,
            lastName: db.dataValues.lastName,
            profilePic: db.dataValues.profilePic,
            phoneNumber: db.dataValues.phoneNumber,
            address: homeAdress,
            city: homeCity,
            state: homeState,
            zipCode: homeZipCode,
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


          userNProductsArray.push(userNProducts)
          console.log(users)
         

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
        sgMail.setApiKey(storage => ENV['key']);

        href = "<a href='localhost:8000.com/email/verification/"
        email = req.body.email + "'" + "> Click Here To Register <a/>"
        var fullEmail = href.concat(email);

        console.log(fullEmail)

        const msg = {
          to: req.body.email,
          from: 'moochsell@donotreply.com',
          subject: 'Reqister Your Email With Mooch Sell ',
          text: name + ' ' + "Please Click The Link to Register Your Email https://mooch-sell.herokuapp.com//email/verification/" + req.body.email,
          // html: '<strong>' + name + ' ' + 'Please Click The Link to Register Your Email <br> </strong>',
        };

        // sgMail.send(msg);

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