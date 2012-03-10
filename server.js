var express = require('express');

var app = express.createServer();

app.configure( function() {
  app.set('view engine', 'jade');
});

app.get('/', function(req, res) {
  res.render('index', {layout: false});
});

app.listen(8000);
