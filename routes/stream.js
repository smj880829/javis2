var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./stream/index');
});

router.get('/show', function(req, res, next) {
  res.render('./stream/show');
});

router.get('/show2', function(req, res, next) {
  res.render('./stream/show2');
});

router.get('/down', function(req, res, next) {
  res.render('./stream/down');
});

router.post('/down', function(req, res, next) {
  var WebTorrent = require('webtorrent')

  var client = new WebTorrent()

  var magnetURI = req.body.mag;

  res.render('./stream/down');
  client.add(magnetURI, { path: './files' }, function (torrent) {
    console.log('start')
    torrent.on('done', function () {
      console.log('torrent download finished')

    })
  })
});


module.exports = router;
