var express = require('express');
var router = express.Router();

var authorization = require('../authorization');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.post('/login', function(req, res, next) {
  var auth = new authorization()
    auth.method(req.body.loginmethod)
    .email(req.body.email)
    .pass(req.body.password)
    .token(req.body.accesstoken)
    .id(req.body.id)
    .name(req.body.name)

    auth.check_user(function(re){
          if(re){
           token_ctl.getNewToken(req.body.email,function(token){
             res.cookie('token',token,{expires: new Date(Date.now() + 600000),httpOnly: true,maxAge:600000})
             res.send({'token' : token,'check':'true','email':req.body.email});
          })
        }else{
            res.send({'check':'false'});
        }
    });
});

module.exports = router;
