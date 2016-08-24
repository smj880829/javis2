var express = require('express');
var router = express.Router();

var authorization = require('../authorization');
var token_ctl = require('../controller_token')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.get('/logintoken', function(req, res, next) {
    token_ctl.getNewToken('123',function(token){
      res.cookie('token',token,{expires: new Date(Date.now() + 600000),httpOnly: true,maxAge:600000})
   })
  res.redirect('/');
});

router.post('/login', function(req, res, next) {

});

module.exports = router;
