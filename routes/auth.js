var express = require('express');
var router = express.Router();

var auth = require('../authorization');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.get('/login', function(req, res, next) {
  res.render('./auth/login', { title: 'WELCOME' });
});

router.post('/login', function(req, res, next) {

});

module.exports = router;
