var express = require('express');
var faye = require('faye');
var util = require('util');

function MessageServer(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  
  var self = this;
  
  self.settings = {
    port: options.port || 8000
  };
  
  self.init();
};

MessageServer.prototype.init = function() {
  var self = this;

  self.bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

  self.app = express.createServer();

  self.setupRoutes();

  self.bayeux.attach(self.app);
  console.log("Listening on port " + self.settings.port + "...");
  self.app.listen(self.settings.port);
};

MessageServer.prototype.setupRoutes = function() {
  var self = this;
  
  self.app.configure(function() {
    self.app.set('view engine', 'jade');
    self.app.use(express.static(__dirname + '/../public'));
    self.app.use(express.bodyParser());
  });

  // main page
  self.app.get('/', function(req, res) {
    res.render('index', {layout: false});
  });

  // websocket config info
  self.app.get('/config.json', function(req, res) {
    var configData = {
      port: 8000
    };
    res.json(configData, 200);
  });

  // To post data, use something like this:
  // curl -v -H "Content-Type: application/json" -X POST -d '{"id": 1, "data" : 1.5}' http://127.0.0.1:8000/data
  self.app.post('/data', function(req, res) {
    util.log('POST data message: ' + util.inspect(req.body));
    var id = req.body.id || 0;
    var data = req.body.data || 0;
    self.bayeux.getClient().publish('/data', {"time": new Date().getTime(), 
                                              'id': id, 'data': data});
    res.send(200);
  });

};

module.exports = MessageServer;

