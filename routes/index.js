var express = require('express');
var router = express.Router();
var usermodel = require('./users')
var mongoose=  require("mongoose");
var chatmodel = require('../models/chatModel')

const passport = require('passport');
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");

// const mailer = require("../nodemailer");

const localStrategy = require("passport-local");

passport.use(new localStrategy(usermodel.authenticate()));

mongoose.connect('mongodb://127.0.0.1:27017/whatsapp-clone').then(() => {
  console.log('connected to database')
}).catch(err => {
  console.log(err)
})


/* GET home page. */
router.get('/', isLoggedIn,async function(req, res, next) {
  var currentUser = await  usermodel.findOne({username : req.session.passport.user})
  var allusers =await usermodel.find()  
  res.render('index' ,{ allusers,currentUser});  
});




router.post('/send-msg/:recieverid/:senderid',async function(req, res, next) {
  await chatmodel.create({     
  sender_id: req.params.senderid,
  receiver_id: req.params.recieverid,
   message: req.body.message,
  })
  res.redirect("back");
});





router.get('/register', function(req, res, next) {
  res.render('register');
});


router.get('/chats/:userid',async function(req, res, next) {
  
  var currentUser = await  usermodel.findOne({username:req.session.passport.user})
  var allusers =await usermodel.find()  
  var reciever = await usermodel.findOne({_id:req.params.userid})
  var allmsg = await chatmodel.find()


  // console.log(allmsg[1].sender_id.toHexString());

 
  
  res.render('chats' ,{ allusers,currentUser,reciever,allmsg});  

});


router.post('/register', function(req, res, next) {
  usermodel.findOne({username: req.body.username})
  .then(function(foundUser){
    if (foundUser) {
      res.send("username already exists")
    }
    else{
      var newuser = new usermodel({
        username:req.body.username,
        email:req.body.email,       
        image:req.body.image,
      })
      usermodel.register(newuser , req.body.password)
      .then(function(u){
        passport.authenticate("local")(req,res,function(){
          res.redirect("/");
        })
    
      })
    }
  })
 
})
  




  



// login a user


router.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect:'/login',

}));
router.get('/login',function(req,res,next){
  res.render('login')
})

//logout a user

router.get('/logout',function(req,res,next){
  req.logOut();
  res.redirect('/login');
})


// is logeed in middle ware

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/login');
  }
}



//-------------------------------------------------------------------

module.exports = router;
