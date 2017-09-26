var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


/* connection 이벤트 발생시 처리 내용을 정의 */
io.on('connection', function(socket) {
  // socket이라는 변수는 node.js의 socket.io 패키지에서 우리에게 넘겨주는 변수임
  // socket.io 서버에 접속한 클라이언트의 socket을 의미함.
  console.log('a user connected');
  socket.broadcast.emit('hi'); // 'hi'라는 이벤트를 생성함

  // 'disconnect'라는 이벤트 처리 내용을 정의
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // 'chat message'라는 이벤트 처리 내용을 정의
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

io.emit('some event', { for: 'everyone' });

var port = 3000;
http.listen(port, function(){
  console.log('listening on *:', port);
});

