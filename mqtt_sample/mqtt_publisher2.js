var mqtt = require('mqtt');
//var client = mqtt.connect('mqtt://localhost');
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function(){
  console.log('mqtt publisher connected to BROKER SERVER');
  for(var i=1; i<6; i++) {
    setTimeout(function () {
      var mesg = 'hihi ' + i;
      client.publish('AAAA', mesg);
      console.log(mesg);
    }, 1000*i);
  }
});

