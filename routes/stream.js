var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./stream/index');
});

router.get('/show', function(req, res, next) {

  var file = path.resolve(__dirname,"../files/FHD-star-706.mp4");
  fs.stat(file, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 Error if file not found
        return res.sendStatus(404);
      }
    res.end(err);
    }
    var range = req.headers.range;
    if (!range) {
     // 416 Wrong range
     return res.sendStatus(416);
    }
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    var total = stats.size;
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = (end - start) + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    });

    var stream = fs.createReadStream(file, { start: start, end: end })
      .on("open", function() {
        stream.pipe(res);
      }).on("error", function(err) {
        res.end(err);
      });
  });
}

  res.render('./stream/show');
});

router.get('/down', function(req, res, next) {
    var WebTorrent = require('webtorrent')

  var client = new WebTorrent()

  var magnetURI = 'magnet:?xt=urn:btih:87FE6031EC4C0EBFD526A51E9E08863FF4856BE7&dn=FHD-star-706.mp4&tr=http%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce&tr=udp%3a%2f%2fopen.demonii.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2710%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2710%2fannounce&tr=http%3a%2f%2f163.172.32.53%3a8000%2fannounce&tr=udp%3a%2f%2f163.172.32.53%3a8000&tr=udp%3a%2f%2fopen.nyaatorrents.info%3a6544%2fannounce'

  res.render('./stream/index',{title:'succes'});
  client.add(magnetURI, { path: './files' }, function (torrent) {
    console.log('start')
    torrent.on('done', function () {
      console.log('torrent download finished')

    })
  })
});


module.exports = router;
