var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
//var client  = mqtt.connect('mqtt://localhost');

//mqtt 클라이언트 연결, 연결되면 subscribe
client.on('connect', function () {
  client.on('message',function(topic, message) {
      console.log(topic + ' : ' + message);
  });

  client.subscribe("AAAA");
  console.log('mqtt subscriber has connected to BROKER SERVER');
});
 

