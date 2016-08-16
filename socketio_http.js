var io =  require('socket.io')();
var db = require('./MongoConnector/DAO')
var conf = require('./MongoConnector/Conf')

module.exports = function(options) {
  io.attach(options,{origins:conf.ip +':* http://' + conf.ip +':*'});
  //io.attach(options);
};

io.on('connection', function (socket) {
    console.log('socket connect');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


})
