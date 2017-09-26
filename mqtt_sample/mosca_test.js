/*
npm install -g mosca : 실행파일 설치
npm install mosca    : library 설치
mosca library를 이용하여 MQTT 서버를 customize하여 사용할 수 있다.
*/
var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  //backend: ascoltatore
};

var server = new mosca.Server(settings);

// fired when a client connects
server.on('clientConnected', function(client) {
console.log('Client Connected:', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
console.log('Client Disconnected:', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet);
  console.log('Client', client);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
