var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./stream/index');
});

router.get('/show', function(req, res, next) {
  res.render('./stream/show');
});

router.get('/down', function(req, res, next) {
    var WebTorrent = require('webtorrent')

  var client = new WebTorrent()

  var magnetURI = 'magnet:?xt=urn:btih:281AC5D97DD79EAEA4A8262B6C50DE5850F485EA&dn=Aino%20%20Miyuu%20XVSR-133.mp4&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2740%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2780%2fannounce&tr=http%3a%2f%2f163.172.32.53%3a8000%2fannounce&tr=udp%3a%2f%2f163.172.32.53%3a8000&tr=udp%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce'

  res.render('./stream/index',{title:'succes'});
  client.add(magnetURI, { path: './files' }, function (torrent) {
    console.log('start')
    torrent.on('done', function () {
      console.log('torrent download finished')

    })
  })
});


module.exports = router;
