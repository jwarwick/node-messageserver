process.addListener('uncaughtException', function(err, stack) {
  console.log('----------------------');
  console.log('Exception: ' + err);
  console.log(err.stack);
  console.log('----------------------');
});

var MessageServer = require('./lib/message_server');

new MessageServer({
  port: 8000
});
