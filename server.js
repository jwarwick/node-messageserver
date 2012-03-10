process.addListener('uncaughtException', function(err, stack) {
  console.log('----------------------');
  console.log('Exception: ' + err);
  console.log(err.stack);
  console.log('----------------------');
});

var express = require('express');
var faye = require('faye');
var util = require('util');

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

var app = express.createServer();

app.configure(function() {
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.get('/', function(req, res) {
  res.render('index', {layout: false});
});

// websocket config info
app.get('/config.json', function(req, res) {
  var json = {port: 8000};
  res.json(json, 200);
});

// To post data, use something like this:
// curl -v -H "Content-Type: application/json" -X POST -d '{"msg" : "contents"}' http://127.0.0.1:8000/messages
app.post('/messages', function(req, res) {
  util.log('POST message: ' + util.inspect(req.body));
  bayeux.getClient().publish('/messages', req.body);
  res.send(200);
});

bayeux.attach(app);
console.log("Listening on port 8000...");
app.listen(8000);
