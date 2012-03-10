jQuery(document).ready(function($) {

  var client = new Faye.Client('http://localhost:8000/faye', {
    timeout: 120
  });

  client.subscribe('/messages', function(message) {
    console.log("Message: " + message);
    $("<p>" + JSON.stringify(message) + "</p>")
      .hide()
      .appendTo('#messages')
      .fadeIn();
    // $("#messages").append("<p>" + JSON.stringify(message) + "</p>");
  });

});