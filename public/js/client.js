jQuery(document).ready(function($) {
  var self = this;

  $.getJSON("/config.json", function(config) {
    self.client = new Faye.Client('http://' + window.location.hostname 
                                    + ":" + config.port + '/faye', {
      timeout: 120
    });

    self.client.subscribe('/messages', function(message) {
      console.log("Message: " + message);
      $("<p>" + JSON.stringify(message) + "</p>")
        .hide()
        .appendTo('#messages')
        .fadeIn();
    });
    
  });
});