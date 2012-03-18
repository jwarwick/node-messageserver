jQuery(document).ready(function($) {
  var self = this;

  $.getJSON("/config.json", function(config) {
    self.client = new Faye.Client('http://' + window.location.hostname 
                                    + ":" + config.port + '/faye', {
      timeout: 120
    });
    
    self.client.subscribe('/data', function(data) {
      console.log("Data:");
      console.log(data);
      $("<p>" + JSON.stringify(data) + "</p>")
        .hide()
        .appendTo('#messages')
        .fadeIn();
      
      if (self.lines[data.id] == undefined) {
        self.lines[data.id] = new TimeSeries();
        var hue = (data.id * 60) % 360;
        self.smoothie.addTimeSeries(self.lines[data.id],
          { strokeStyle:'hsl(' + hue + ', 100%, 50%)', 
            fillStyle:'hsla(' + hue + ', 100%, 50%, 0.4)', 
            lineWidth:3 });
      }
      
      self.lines[data.id].append(data.time, data.data);
    });
  });
  
  
  self.smoothie = new SmoothieChart();
  self.smoothie.streamTo(document.getElementById("my_canvas"), 1000);
  
  self.lines = new Array();
});
