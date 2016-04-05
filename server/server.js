var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var morgan = require('morgan');
var parser = require('body-parser');
var mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../client'));

// mongoose.connect('mongodb://localhost/chat');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error...'));
// db.once('open', function callback() {
//   console.log('db opened');
// });

app.get('/', function(req, res) {
  res.render('../client/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('Listening on port', port, '...');
});