var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./stream/index');
});

router.get('/down', function(req, res, next) {
    var WebTorrent = require('webtorrent')

  var client = new WebTorrent()

  var magnetURI = 'magnet:?xt=urn:btih:87FE6031EC4C0EBFD526A51E9E08863FF4856BE7&dn=FHD-star-706.mp4&tr=http%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce&tr=udp%3a%2f%2fopen.demonii.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2710%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2710%2fannounce&tr=http%3a%2f%2f163.172.32.53%3a8000%2fannounce&tr=udp%3a%2f%2f163.172.32.53%3a8000&tr=udp%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce'
  console.log('start')
  client.add(magnetURI, { path: '/data/files' }, function (torrent) {
    torrent.on('done', function () {
      console.log('torrent download finished')
      res.render('./stream/index',{title:'succes'});
    })
  })
});


module.exports = router;
