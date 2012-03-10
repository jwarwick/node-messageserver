var client = new Faye.Client('http://localhost:8000/faye', {
  timeout: 120
});

client.subscribe('/messages', function(message) {
  console.log("Message: " + message);
  $("#messages").append("<p>" + JSON.stringify(message) + "</p>");
});
