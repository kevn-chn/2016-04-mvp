var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../client'));

// mongoose.connect('mongodb://localhost/chat');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error...'));
// db.once('open', function callback() {
//   console.log('db opened');
// });

app.get('*', function(req, res) {
  res.render('../client/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port, '...');