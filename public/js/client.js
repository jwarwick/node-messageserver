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
    
    self.client.subscribe('/data', function(data) {
      console.log("Data: " + data);
      $("<p>" + JSON.stringify(data) + "</p>")
        .hide()
        .appendTo('#messages')
        .fadeIn();
               
        self.line1.append(data.time, data.data);
    });
  });
  
  
  self.smoothie = new SmoothieChart();
  self.smoothie.streamTo(document.getElementById("my_canvas"), 1000);
  
  self.line1 = new TimeSeries();
  self.line2 = new TimeSeries();
  
  self.smoothie.addTimeSeries(self.line1,
    { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
  self.smoothie.addTimeSeries(self.line2, 
    { strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });
  
});