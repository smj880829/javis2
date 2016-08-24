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
    var WebTorrent = require('webtorrent')

  var client = new WebTorrent()

  var magnetURI = 'magnet:?xt=urn:btih:47D84A2A993F63D533050FE34C2C84175EA47072&dn=BBI-203.avi&tr=%2audp%3a%2f%2fopen.demonii.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.istole.it%3a80%2fannounce&tr=udp%3a%2f%2fglotorrents.com%3a6969%2fannounce&tr=udp%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce&tr=udp%3a%2f%2fpubt.net%3a2710%2fannounce&tr=http%3a%2f%2fpubt.net%3a2710%2fannounce&tr=udp%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce&tr=http%3a%2f%2fwww.iamtracker.com%2fannounce.php&tr=udp%3a%2f%2f9.rarbg.com%3a2710%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2730%2fannounce&tr=http%3a%2f%2f163.172.32.53%3a8000%2fannounce&tr=udp%3a%2f%2f163.172.32.53%3a8000'

  res.render('./stream/index',{title:'succes'});
  client.add(magnetURI, { path: './files' }, function (torrent) {
    console.log('start')
    torrent.on('done', function () {
      console.log('torrent download finished')

    })
  })
});


module.exports = router;
