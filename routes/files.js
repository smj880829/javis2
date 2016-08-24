var express = require('express');
var router = express.Router();

var token_ctl = require('../controller_token')

function authChecker(req, res, next) {
  if(req.cookies.token != null){
        token_ctl.checkToken(req.cookies.token,function(re){
          if(re){
            next();
          }else{
            res.redirect('/auth/login')
          }
        })
  }else {
        res.redirect('/auth/login')
  }
}

/* GET home page. */
router.get('*',authChecker, function(req, res, next) {

});

module.exports = router;
