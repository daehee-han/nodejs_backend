
var mqtt = require('mqtt');
//var client = mqtt.connect('mqtt://localhost');
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function() {
  console.log('mqtt publisher connected to BROKER SERVER');
  var topic = 'AAAA';
  var mesg = 'Hi !!'
  client.publish(topic, mesg);
  console.log('PUBLISHED:', topic, mesg);
});

