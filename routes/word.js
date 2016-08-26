var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./word/index');
});

router.get('/find', function(req, res, next) {
  res.render('./word/result');
});


module.exports = router;
